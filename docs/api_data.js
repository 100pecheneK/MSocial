define({ "api": [
  {
    "type": "post",
    "url": "/user/auth/login",
    "title": "Authenticate user",
    "version": "0.1.0",
    "name": "Login",
    "group": "Authentication",
    "description": "<p>Authenticate user</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>of the registered User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Created-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWZjMzFlNDFiMWZhMDA0Yjk5ZDNjMzYiLCJpYXQiOjE1OTM1ODYxNDh9.z81zNeJXZviRQew-LJi5W-rqCf8XcDHL6eEn37jEqy8\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object[]",
            "optional": false,
            "field": "errors",
            "description": "<p>Array of the errors objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Bad-Request-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"errors\": [\n    {\n      \"msg\": \"Пожалуйста, укажите верный Email\",\n      \"param\": \"email\",\n      \"location\": \"body\"\n    },\n    {\n      \"msg\": \"Пароль обязателен\",\n      \"param\": \"password\",\n      \"location\": \"body\"\n    }\n  ]\n}",
          "type": "json"
        },
        {
          "title": "Bad-Request-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"errors\": [\n    {\n      \"msg\": \"Неверные данные\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/user/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/user/auth/logout",
    "title": "Logout user",
    "version": "0.1.0",
    "name": "Logout",
    "group": "Authentication",
    "description": "<p>Logout user from current device</p>",
    "permission": [
      {
        "name": "user",
        "title": "Authenticated User",
        "description": "<p>User with valid token</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token of User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\":\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU4YWI5MWZlMTk5ZjE1YzYyYTQzM2UiLCJpYXQiOjE1OTIzMDc0NDh9.DqgT0RH6g1Mm8fpbXYz6Bf4KGnsUxo-Vk-UNKmvptjk\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "Success",
            "description": "<p>message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"msg\": \"Успешный выход\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object[]",
            "optional": false,
            "field": "errors",
            "description": "<p>Array of the errors objects.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "Object[]",
            "optional": false,
            "field": "errors",
            "description": "<p>Array of the errors objects.</p>"
          }
        ]
      }
    },
    "filename": "routes/api/user/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "get",
    "url": "/user/auth/logoutall",
    "title": "Logout user everywhere",
    "version": "0.1.0",
    "name": "Logout_All",
    "group": "Authentication",
    "description": "<p>Logout user from all devices</p>",
    "permission": [
      {
        "name": "user",
        "title": "Authenticated User",
        "description": "<p>User with valid token</p>"
      }
    ],
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Authorization",
            "description": "<p>Token of User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\",\n  \"Authorization\":\"Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWU4YWI5MWZlMTk5ZjE1YzYyYTQzM2UiLCJpYXQiOjE1OTIzMDc0NDh9.DqgT0RH6g1Mm8fpbXYz6Bf4KGnsUxo-Vk-UNKmvptjk\"\n}",
          "type": "json"
        }
      ]
    },
    "success": {
      "fields": {
        "200": [
          {
            "group": "200",
            "type": "String",
            "optional": false,
            "field": "Success",
            "description": "<p>message.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"msg\": \"Успешный выход со всех устройств\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object[]",
            "optional": false,
            "field": "errors",
            "description": "<p>Array of the errors objects.</p>"
          }
        ],
        "401": [
          {
            "group": "401",
            "type": "Object[]",
            "optional": false,
            "field": "errors",
            "description": "<p>Array of the errors objects.</p>"
          }
        ]
      }
    },
    "filename": "routes/api/user/authentication.js",
    "groupTitle": "Authentication"
  },
  {
    "type": "post",
    "url": "/user/auth/register",
    "title": "Register user",
    "version": "0.1.0",
    "name": "Register",
    "group": "Authentication",
    "description": "<p>Register new user</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "Content-Type",
            "description": "<p>application/json.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Header-Example:",
          "content": "{\n  \"Content-Type\": \"application/json\"\n}",
          "type": "json"
        }
      ]
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the User.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "size": ">6",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the User.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "201": [
          {
            "group": "201",
            "type": "String",
            "optional": false,
            "field": "Token",
            "description": "<p>of the registered User.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Created-Response:",
          "content": "HTTP/1.1 201 Created\n{\n  \"token\": \"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWZjMzFlNDFiMWZhMDA0Yjk5ZDNjMzYiLCJpYXQiOjE1OTM1ODYxNDh9.z81zNeJXZviRQew-LJi5W-rqCf8XcDHL6eEn37jEqy8\"\n}",
          "type": "json"
        }
      ]
    },
    "error": {
      "fields": {
        "400": [
          {
            "group": "400",
            "type": "Object[]",
            "optional": false,
            "field": "errors",
            "description": "<p>Array of the errors objects.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Bad-Request-Response:",
          "content": "HTTP/1.1 400 Bad Request\n{\n  \"errors\": [\n    {\n      \"msg\": \"Имя обязательно\",\n      \"param\": \"name\",\n      \"location\": \"body\"\n    },\n    {\n      \"msg\": \"Пожалуйста, укажите верный Email\",\n      \"param\": \"email\",\n      \"location\": \"body\"\n    },\n    {\n      \"msg\": \"Пожалуйста, введите пароль с 6 или более символами\",\n      \"param\": \"password\",\n      \"location\": \"body\"\n    }\n  ]\n}",
          "type": "json"
        }
      ]
    },
    "filename": "routes/api/user/authentication.js",
    "groupTitle": "Authentication"
  }
] });