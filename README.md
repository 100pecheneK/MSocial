# Mern Blog

Mern Blog - блог на стеке MERN.


## Server API

### Routes

#### /api/test
@method *GET*

---
#### /api/users/register
@method *POST*

Accept:
```json
{
    "name": "Misha",
    "email": "mistermihail24@gmail.com",
    "password": "123456"
}
```
Return:
```json
{
    "token": "eyJhbGciOiJ..."
}
```

---

#### /api/users/login
@method *POST*

Accept:
```json
{
    "email": "mistermihail23@gmail.com",
    "password": "123213456"
}
```
Return:
```json
{
    "token": "eyJhbGciOiJ..."
}
```

---

#### /api/users/logout
@method *POST*

Accept:
```
headers: {
    Authorization: Bearer eyJhbGc...
}
```
Return:
```text
Успешный выход
```

---

#### /api/users/logoutall
@method *POST*

Accept:
```
headers: {
    Authorization: Bearer eyJhbGc...
}
```
Return:
```text
Успешный выход со всех устройств
```
