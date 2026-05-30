# دليل ربط Google Apps Script

هذا الدليل يشرح كيفية ربط المنصة بـ Google Sheets عبر Google Apps Script لجعل البيانات حقيقية وقابلة للتعديل.

---

## الخطوة 1: إنشاء Google Sheets

أنشئ ملف Google Sheets جديداً وأضف الأوراق التالية:

### ورقة `Students`
| A | B | C | D | E |
|---|---|---|---|---|
| id | username | name | password | level |
| s1 | student1 | أحمد محمد | 123456 | الصف الثالث الثانوي |
| s2 | student2 | سارة خالد | 123456 | الصف الثالث الثانوي |

### ورقة `Grades`
| A | B | C | D | E | F | G | H |
|---|---|---|---|---|---|---|---|
| id | studentId | courseId | subject | midterm | finalExam | assignments | total |

### ورقة `Assignments`
| A | B | C | D | E | F | G |
|---|---|---|---|---|---|---|
| id | courseId | title | description | dueDate | fileUrl | status |

### ورقة `Announcements`
| A | B | C | D | E |
|---|---|---|---|---|
| id | title | content | date | type |

### ورقة `Courses`
| A | B | C | D | E |
|---|---|---|---|---|
| id | title | instructor | lecturesCount | progress |

---

## الخطوة 2: Google Apps Script الكامل

افتح **Extensions > Apps Script** في Google Sheets والصق الكود:

```javascript
const SHEET_ID = SpreadsheetApp.getActiveSpreadsheet().getId();

function doGet(e) {
  const sheetName = e.parameter.sheet;
  
  // CORS Headers
  const output = handleRequest(sheetName);
  return output;
}

function doPost(e) {
  const data = JSON.parse(e.postData.contents);
  const action = data.action;
  
  if (action === 'login') {
    return handleLogin(data.username, data.password);
  }
  
  if (action === 'submitAssignment') {
    return handleSubmitAssignment(data.assignmentId, data.studentId, data.fileUrl);
  }
  
  return jsonResponse({ error: 'Unknown action' });
}

function handleRequest(sheetName) {
  const allowedSheets = ['Students', 'Grades', 'Assignments', 'Announcements', 'Courses', 'Lectures', 'Files', 'Telegram'];
  
  if (!allowedSheets.includes(sheetName)) {
    return jsonResponse({ error: 'Sheet not found' });
  }
  
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const ws = ss.getSheetByName(sheetName);
  
  if (!ws) return jsonResponse({ error: 'Sheet not found' });
  
  const data = ws.getDataRange().getValues();
  if (data.length < 2) return jsonResponse([]);
  
  const headers = data[0];
  const rows = data.slice(1)
    .filter(row => row[0] !== '') // تخطي الصفوف الفارغة
    .map(row => {
      const obj = {};
      headers.forEach((header, i) => {
        obj[header] = row[i];
      });
      return obj;
    });
  
  return jsonResponse(rows);
}

function handleLogin(username, password) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const ws = ss.getSheetByName('Students');
  const data = ws.getDataRange().getValues();
  const headers = data[0];
  
  const usernameIdx = headers.indexOf('username');
  const passwordIdx = headers.indexOf('password');
  
  const studentRow = data.slice(1).find(row => 
    row[usernameIdx] === username && String(row[passwordIdx]) === String(password)
  );
  
  if (!studentRow) {
    return jsonResponse({ success: false, error: 'بيانات الدخول غير صحيحة' });
  }
  
  const student = {};
  headers.forEach((h, i) => student[h] = studentRow[i]);
  
  // لا تُرجع كلمة المرور!
  delete student.password;
  
  return jsonResponse({ success: true, student });
}

function handleSubmitAssignment(assignmentId, studentId, fileUrl) {
  const ss = SpreadsheetApp.openById(SHEET_ID);
  const ws = ss.getSheetByName('Submissions');
  
  // إنشاء ورقة Submissions إن لم تكن موجودة
  if (!ws) {
    const newWs = ss.insertSheet('Submissions');
    newWs.getRange(1, 1, 1, 4).setValues([['assignmentId', 'studentId', 'fileUrl', 'submittedAt']]);
  }
  
  const submissionsWs = ss.getSheetByName('Submissions');
  submissionsWs.appendRow([assignmentId, studentId, fileUrl, new Date().toISOString()]);
  
  return jsonResponse({ success: true });
}

function jsonResponse(data) {
  const output = ContentService.createTextOutput(JSON.stringify(data));
  output.setMimeType(ContentService.MimeType.JSON);
  return output;
}
```

---

## الخطوة 3: نشر الـ Script

1. في Apps Script: **Deploy > New deployment**
2. Select type: **Web app**
3. Execute as: **Me**
4. Who has access: **Anyone** (لأن الموقع Frontend)
5. انقر **Deploy**
6. انسخ **Web app URL** — ستحتاجه لاحقاً

---

## الخطوة 4: تحديث الكود في المنصة

### أنشئ ملف `src/data/config.ts`:

```typescript
// ضع رابط الـ Web App هنا
export const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/XXXXXXXXX/exec';
```

### استبدل `src/data/auth.ts`:

```typescript
import { APPS_SCRIPT_URL } from './config';
import { Student } from './students';

export const performLogin = async (username: string, password: string): Promise<Student | null> => {
  try {
    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'text/plain' },
      body: JSON.stringify({ action: 'login', username, password }),
    });
    const data = await response.json();
    return data.success ? data.student : null;
  } catch (error) {
    console.error('Login error:', error);
    return null;
  }
};
```

### أنشئ `src/data/api.ts` لجلب البيانات:

```typescript
import { APPS_SCRIPT_URL } from './config';

export async function fetchSheet<T>(sheetName: string): Promise<T[]> {
  try {
    const url = `${APPS_SCRIPT_URL}?sheet=${sheetName}`;
    const response = await fetch(url);
    const data = await response.json();
    return data as T[];
  } catch (error) {
    console.error(`Error fetching ${sheetName}:`, error);
    return [];
  }
}
```

### استخدم في الصفحات:

```typescript
import { useEffect, useState } from 'react';
import { fetchSheet } from '@/data/api';
import type { Grade } from '@/data/grades';

export default function GradesPage() {
  const [grades, setGrades] = useState<Grade[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchSheet<Grade>('Grades').then(data => {
      setGrades(data);
      setLoading(false);
    });
  }, []);

  // ...
}
```

---

## ملاحظات مهمة

1. **CORS**: Google Apps Script لا يدعم CORS Headers في `doGet`/`doPost`. الحل: استخدم `fetch` في الـ Frontend مع `no-cors` mode أو استخدم مكتبة JSONP.

2. **الأمان**: لا ترسل كلمات المرور بشكل حقيقي في Apps Script — يُفضّل تشفيرها أو استخدام Google Firebase Authentication بدلاً من ذلك.

3. **Rate Limiting**: Google Apps Script لديه حد 100 request/day للمستخدمين المجانيين. للمشاريع الأكبر، استخدم Firebase أو Supabase.

4. **التحديث**: البيانات ستُحدَّث فوراً عند تعديل Google Sheets — لا حاجة لإعادة نشر الموقع.
