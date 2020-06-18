# Mern Blog

Mern Blog - блог на стеке MERN.

# Server API

## Routes

### TEST

| @       | INFO      |
| ------- | --------- |
| @url    | /api/test |
| @method | GET       |

---

---

### USER

| @       | INFO                |
| ------- | ------------------- |
| @url    | /api/users/register |
| @method | POST                |

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

| @       | INFO             |
| ------- | ---------------- |
| @url    | /api/users/login |
| @method | POST             |

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

| @       | INFO              |
| ------- | ----------------- |
| @url    | /api/users/logout |
| @method | POST              |

Accept:

```json
headers: {
    "Authorization": "Bearer eyJhbGc..."
}
```

Return:

```json
{
    "msg": "Успешный выход"
}
```

---

| @       | INFO                |
| ------- | ------------------- |
| @url    | api/users/logoutall |
| @method | POST                |

Accept:

```json
headers: {
    "Authorization": "Bearer eyJhbGc..."
}
```

Return:

```json
{
    "msg": "Успешный выход со всех устройств"
}
```

---

---

### PROFILE

| @       | INFO             |
| ------- | ---------------- |
| @url    | /api/profiles/me |
| @method | GET              |

Accept:

```json
headers: {
    "Authorization": "Bearer eyJhbGc..."
}
```

Return:

```json
{
  "avatar": "uploads/profiles/userId/avatar.png",
  "_id": "5ee9e4ccc6181d03655e741c",
  "user": {
    "_id": "5ee9e4ccc6181d03655e741b",
    "name": "Misha"
  },
  "bio": "Bio info",
  "date": "2020-06-17T09:39:24.267Z",
  "__v": 0
}
```

---

| @       | INFO             |
| ------- | ---------------- |
| @url    | /api/profiles/me |
| @method | POST             |

Accept:

```json
headers: {
    "Authorization": "Bearer eyJhbGc..."
}
{
    "bio": "Bio info"
}
```

Return:

```json
{
  "avatar": "uploads/profiles/userId/avatar.png",
  "_id": "5ee9e4ccc6181d03655e741c",
  "user": {
    "_id": "5ee9e4ccc6181d03655e741b",
    "name": "Misha"
  },
  "bio": "Bio info",
  "date": "2020-06-17T09:39:24.267Z",
  "__v": 0
}
```

---

| @       | INFO                    |
| ------- | ----------------------- |
| @url    | /api/profiles/me/avatar |
| @method | POST                    |

Accept:

```json
headers: {
    "Content-Type": "multipart/form-data",
    "Authorization": "Bearer eyJhbGc..."
}
{
    "avatar": "[File] < 5mb"
}
```

Return:

```json
{
  "avatar": "uploads/profiles/userId/newAvatar.png",
  "_id": "5ee9e4ccc6181d03655e741c",
  "user": {
    "_id": "5ee9e4ccc6181d03655e741b",
    "name": "Misha"
  },
  "bio": "Bio info",
  "date": "2020-06-17T09:39:24.267Z",
  "__v": 0
}
```

---
| @       | INFO             |
| ------- | ---------------- |
| @url    | /api/profiles/me |
| @method | delete           |

Accept:

```json
headers: {
    "Content-Type": "multipart/form-data",
    "Authorization": "Bearer eyJhbGc..."
}
```

Return:
```json
{
    "msg": "Пользователь удалён"
}
```