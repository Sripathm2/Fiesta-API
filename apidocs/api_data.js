define({ "api": [
  {
    "type": "get",
    "url": "/token",
    "title": "token",
    "name": "auth",
    "group": "auth",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "token",
            "description": "<p>for the user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "RequestFormatError": [
          {
            "group": "RequestFormatError",
            "optional": false,
            "field": "422",
            "description": "<p>For missing data or invalid password or userName.</p>"
          }
        ],
        "Internal Error": [
          {
            "group": "Internal Error",
            "optional": false,
            "field": "500",
            "description": "<ul> <li>Internal Error.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/auth-router.js",
    "groupTitle": "auth"
  },
  {
    "type": "post",
    "url": "/designs",
    "title": "",
    "name": "designs",
    "group": "designs",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "Integer",
            "optional": false,
            "field": "eventID",
            "description": "<p>{String} Base64 encoded image</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Body Example",
          "content": "{\n           eventID: 5,\n           imageString: 'Base64EncodedImage'",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Success.",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "RequestFormatError": [
          {
            "group": "RequestFormatError",
            "optional": false,
            "field": "422",
            "description": "<p>Missing eventID, imageString or Invalid String (Not Base64)</p>"
          }
        ],
        "Internal Error": [
          {
            "group": "Internal Error",
            "optional": false,
            "field": "500",
            "description": "<ul> <li>Internal Error</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/designs-router.js",
    "groupTitle": "designs"
  },
  {
    "type": "post",
    "url": "/create",
    "title": "",
    "name": "create",
    "group": "event",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>of event owner. {String} date of event in format 'YYYY-MM-DD HH:mm:SS' {float[2]} array of floats containing longitude/latitude. {String} name of party supplier. {String} name of caterer. {String[]} array of guests invited.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Body Example",
          "content": "{\n       userName: 'johndoe',\n       date: '2019-02-09 05:00:00',\n       location: [ 40.423540, -86.921740 ],\n       partySupplier: 'Party City',\n       caterer: 'Chipotle',\n       guests: [ 'Jane Doe', 'Scott Smith', 'George Washington' ]\n   }",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "eventID.",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "RequestFormatError": [
          {
            "group": "RequestFormatError",
            "optional": false,
            "field": "422",
            "description": "<p>For missing parameter(s).</p>"
          }
        ],
        "Internal Error": [
          {
            "group": "Internal Error",
            "optional": false,
            "field": "500",
            "description": "<ul> <li>Internal Error.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/event-router.js",
    "groupTitle": "event"
  },
  {
    "type": "get",
    "url": "/event",
    "title": "",
    "name": "event",
    "group": "event",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "up",
            "description": "<p>to 100 results.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "RequestFormatError": [
          {
            "group": "RequestFormatError",
            "optional": false,
            "field": "422",
            "description": "<p>For missing data or invalid location/lat,lon or budget.</p>"
          }
        ],
        "Internal Error": [
          {
            "group": "Internal Error",
            "optional": false,
            "field": "500",
            "description": "<ul> <li>Internal Error</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/event-router.js",
    "groupTitle": "event"
  },
  {
    "type": "get",
    "url": "/image_get",
    "title": "",
    "name": "image_get",
    "group": "event",
    "parameter": {
      "fields": {
        "query": [
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>of the event</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request query Example",
          "content": "{\n       id: 'jhbbgdciuwdc'\n   }",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "RequestFormatError": [
          {
            "group": "RequestFormatError",
            "optional": false,
            "field": "422",
            "description": "<p>For missing parameter(s).</p>"
          }
        ],
        "Internal Error": [
          {
            "group": "Internal Error",
            "optional": false,
            "field": "500",
            "description": "<ul> <li>Internal Error.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/event-router.js",
    "groupTitle": "event"
  },
  {
    "type": "post",
    "url": "/image_post",
    "title": "",
    "name": "image_post",
    "group": "event",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>of the images encoded 64. {String} id of the event</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Body Example",
          "content": "{\n       data: 'oaisduhfhugiouhedrgiergiuoher',\n       id: 'jhbbgdciuwdc'\n   }",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message:",
            "description": "<p>success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "RequestFormatError": [
          {
            "group": "RequestFormatError",
            "optional": false,
            "field": "422",
            "description": "<p>For missing parameter(s).</p>"
          }
        ],
        "Internal Error": [
          {
            "group": "Internal Error",
            "optional": false,
            "field": "500",
            "description": "<ul> <li>Internal Error.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/event-router.js",
    "groupTitle": "event"
  },
  {
    "type": "post",
    "url": "/rsvp",
    "title": "",
    "name": "rsvp",
    "group": "event",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>{String} id of the event {String} rsvp status ('yes'/'no')</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Body Example",
          "content": "{\n       userName: 'johndoe',\n       id: 'jhbbgdciuwdc',\n       status: 'yes'\n   }",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message:",
            "description": "<p>success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "RequestFormatError": [
          {
            "group": "RequestFormatError",
            "optional": false,
            "field": "422",
            "description": "<p>For missing parameter(s).</p>"
          }
        ],
        "Internal Error": [
          {
            "group": "Internal Error",
            "optional": false,
            "field": "500",
            "description": "<ul> <li>Internal Error.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/event-router.js",
    "groupTitle": "event"
  },
  {
    "type": "get",
    "url": "/tasks_get",
    "title": "",
    "name": "task_get",
    "group": "event",
    "parameter": {
      "fields": {
        "query": [
          {
            "group": "query",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>of the event</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request query Example",
          "content": "{\n       id: 'jhbbgdciuwdc'\n   }",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "image",
            "description": "<p>data.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "RequestFormatError": [
          {
            "group": "RequestFormatError",
            "optional": false,
            "field": "422",
            "description": "<p>For missing parameter(s).</p>"
          }
        ],
        "Internal Error": [
          {
            "group": "Internal Error",
            "optional": false,
            "field": "500",
            "description": "<ul> <li>Internal Error.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/event-router.js",
    "groupTitle": "event"
  },
  {
    "type": "post",
    "url": "/tasks_post",
    "title": "",
    "name": "tasks_post",
    "group": "event",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "tasks",
            "description": "<p>of the event. {String} id of the event</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Body Example",
          "content": "{\n       task: '{oaisduhfhugiouhedrgiergiuoher}',\n       id: 'jhbbgdciuwdc'\n   }",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message:",
            "description": "<p>success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "RequestFormatError": [
          {
            "group": "RequestFormatError",
            "optional": false,
            "field": "422",
            "description": "<p>For missing parameter(s).</p>"
          }
        ],
        "Internal Error": [
          {
            "group": "Internal Error",
            "optional": false,
            "field": "500",
            "description": "<ul> <li>Internal Error.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/event-router.js",
    "groupTitle": "event"
  },
  {
    "type": "post",
    "url": "/update",
    "title": "",
    "name": "update",
    "group": "event",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "date",
            "description": "<p>of event in format 'YYYY-MM-DD HH:mm:SS' {float[2]} array of floats containing longitude/latitude. {String} name of party supplier. {String} name of caterer. {String[]} array of guests invited. {String} id of the event</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Body Example",
          "content": "{\n       date: '2019-02-09 05:00:00',\n       location: [ 40.423540, -86.921740 ],\n       partySupplier: 'Party City',\n       caterer: 'Chipotle',\n       guests: [ 'Jane Doe', 'Scott Smith', 'George Washington' ]\n   }",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "message:",
            "description": "<p>success.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "RequestFormatError": [
          {
            "group": "RequestFormatError",
            "optional": false,
            "field": "422",
            "description": "<p>For missing parameter(s).</p>"
          }
        ],
        "Internal Error": [
          {
            "group": "Internal Error",
            "optional": false,
            "field": "500",
            "description": "<ul> <li>Internal Error.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/event-router.js",
    "groupTitle": "event"
  },
  {
    "type": "post",
    "url": "/feedback",
    "title": "",
    "name": "feedback",
    "group": "feedback",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "feedbackText",
            "description": "<p>of the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Body Example",
          "content": "{\n       feedbackText: 'TestUser1feedback'",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Success.",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "RequestFormatError": [
          {
            "group": "RequestFormatError",
            "optional": false,
            "field": "422",
            "description": "<p>For missing data or invalid email, password or userName.</p>"
          }
        ],
        "Internal Error": [
          {
            "group": "Internal Error",
            "optional": false,
            "field": "500",
            "description": "<ul> <li>Internal Error.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/feedback-router.js",
    "groupTitle": "feedback"
  },
  {
    "type": "get",
    "url": "/user/forgetPassword",
    "title": "forgetPassword",
    "name": "forgetPassword",
    "group": "user",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "securityQuestion",
            "description": "<p>for that user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "RequestFormatError": [
          {
            "group": "RequestFormatError",
            "optional": false,
            "field": "422",
            "description": "<p>For missing data or invalid email, password or userName.</p>"
          }
        ],
        "Internal Error": [
          {
            "group": "Internal Error",
            "optional": false,
            "field": "500",
            "description": "<ul> <li>Internal Error.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/user-router.js",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/user/forgetPassword",
    "title": "forgetPassword",
    "name": "forgetPassword",
    "group": "user",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>of the user.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>of the user.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "securityQuestion",
            "description": "<p>of the user.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "securityAnswer",
            "description": "<p>of the user.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>of the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Body Example",
          "content": "{\n       userName: 'TestUser1',\n       password: 'TestPassword1@',\n       email: 'test1@test.com',\n       securityQuestion: 'hello hint',\n       securityAnswer: 'hello',\n       name: 'test test',\n   }",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Success.",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "RequestFormatError": [
          {
            "group": "RequestFormatError",
            "optional": false,
            "field": "422",
            "description": "<p>For missing data or invalid password.</p>"
          }
        ],
        "Internal Error": [
          {
            "group": "Internal Error",
            "optional": false,
            "field": "500",
            "description": "<ul> <li>Internal Error.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/user-router.js",
    "groupTitle": "user"
  },
  {
    "type": "get",
    "url": "/user/getData",
    "title": "getData",
    "name": "getData",
    "group": "user",
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "data",
            "description": "<p>about the user.</p>"
          }
        ]
      }
    },
    "error": {
      "fields": {
        "RequestFormatError": [
          {
            "group": "RequestFormatError",
            "optional": false,
            "field": "422",
            "description": "<p>For missing data.</p>"
          }
        ],
        "Internal Error": [
          {
            "group": "Internal Error",
            "optional": false,
            "field": "500",
            "description": "<ul> <li>Internal Error.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/user-router.js",
    "groupTitle": "user"
  },
  {
    "type": "post",
    "url": "/user/register",
    "title": "Register",
    "name": "userRegister",
    "group": "user",
    "parameter": {
      "fields": {
        "body": [
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "userName",
            "description": "<p>of the user.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>of the user.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>of the user.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "securityQuestion",
            "description": "<p>of the user.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "securityAnswer",
            "description": "<p>of the user.</p>"
          },
          {
            "group": "body",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>of the user.</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Request Body Example",
          "content": "{\n       userName: 'TestUser1',\n       password: 'TestPassword1@',\n       email: 'test1@test.com',\n       securityQuestion: 'hello hint',\n       securityAnswer: 'hello',\n       name: 'test test',\n   }",
          "type": "JSON"
        }
      ]
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "Success.",
            "description": ""
          }
        ]
      }
    },
    "error": {
      "fields": {
        "RequestFormatError": [
          {
            "group": "RequestFormatError",
            "optional": false,
            "field": "422",
            "description": "<p>For missing data or invalid email, password or userName.</p>"
          }
        ],
        "Internal Error": [
          {
            "group": "Internal Error",
            "optional": false,
            "field": "500",
            "description": "<ul> <li>Internal Error.</li> </ul>"
          }
        ]
      }
    },
    "version": "0.0.0",
    "filename": "app/routes/user-router.js",
    "groupTitle": "user"
  }
] });
