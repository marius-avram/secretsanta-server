define({ "api": [
  {
    "type": "post",
    "url": "/member/group/join",
    "title": "Join a new group",
    "version": "1.0.0",
    "name": "GoupJoin",
    "group": "Group",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Join an existing group. members array from response group should contain the name of the username making the call in case of success.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nickname of the user making the request.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "hash",
            "description": "<p>Hash of the user password.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Mongo _id of the group</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Determines if call was succesful or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>{text: &quot;Error message&quot;, &quot;error&quot;: call_stack_obj}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "group",
            "description": "<p>{name: &quot;Nasty people&quot;, memberLimit: 20, members[username], giveTo: []}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ success : true, group: { name: \"Nasty people\", memberLimit: 20, members: [username], giveTo: []}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ success : false, error: { text: \"Group not found.\"}}",
          "type": "json"
        }
      ]
    },
    "filename": "server/services/group.js",
    "groupTitle": "Group"
  },
  {
    "type": "post",
    "url": "/member/group/create",
    "title": "Create a new group",
    "version": "1.0.0",
    "name": "GroupCreate",
    "group": "Group",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Create a new group identified by name and memberLimit</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nickname of the user making the request.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "hash",
            "description": "<p>Hash of the user password.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of group.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "memberLimit",
            "description": "<p>Member limit.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Determines if call was succesful or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>{text: &quot;Error message&quot;, &quot;error&quot;: call_stack_obj}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "group",
            "description": "<p>{name: &quot;Nasty people&quot;, memberLimit: 20, members[username], giveTo: []}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ success : true, group: { name: \"Nasty people\", memberLimit: 20, members[username], giveTo: []}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ success : false, error: { text: \"Group name mandatory.\"}}",
          "type": "json"
        }
      ]
    },
    "filename": "server/services/group.js",
    "groupTitle": "Group"
  },
  {
    "type": "post",
    "url": "/member/groups/own",
    "title": "Get own groups",
    "version": "1.0.0",
    "name": "GroupOwn",
    "group": "Group",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Get groups in which you are a member.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nickname of the user making the request.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "hash",
            "description": "<p>Hash of the user password.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "name",
            "description": "<p>Name of group.</p>"
          },
          {
            "group": "Parameter",
            "type": "Number",
            "optional": false,
            "field": "memberLimit",
            "description": "<p>Member limit.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Determines if call was succesful or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>{text: &quot;Error message&quot;, &quot;error&quot;: call_stack_obj}</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "groups",
            "description": "<p>[{name: &quot;Nasty people&quot;, memberLimit: 20, members[username], giveTo: []}]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ success : true, groups: [{ name: \"Nasty people\", memberLimit: 20, members[username], giveTo: []}]}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ success : false, error: { text: \"Error while getting own groups.\", error: call_stack_obj}}",
          "type": "json"
        }
      ]
    },
    "filename": "server/services/group.js",
    "groupTitle": "Group"
  },
  {
    "type": "get",
    "url": "/member/groups/search",
    "title": "Search group by keyword",
    "version": "1.0.0",
    "name": "GroupOwn",
    "group": "Group",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Search group by keyword</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nickname of the user making the request.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "hash",
            "description": "<p>Hash of the user password.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "keyword",
            "description": "<p>Search term use as as regular expresion .<em>keyword.</em> to find groups. Search is case insensitve.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Determines if call was succesful or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>{text: &quot;Error message&quot;, &quot;error&quot;: call_stack_obj}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "group",
            "description": "<p>{name: &quot;Nasty people&quot;, memberLimit: 20, members[username], giveTo: []}</p>"
          },
          {
            "group": "Success 200",
            "type": "List",
            "optional": false,
            "field": "groups",
            "description": "<p>[{name: &quot;Nasty people&quot;, memberLimit: 20, members[username], giveTo: []}]</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ success : true, groups: [{ name: \"Nasty people\", memberLimit: 20, members[username], giveTo: []}]}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ success : false, error: { text: \"Error while getting own groups.\", error: call_stack_obj}}",
          "type": "json"
        }
      ]
    },
    "filename": "server/services/group.js",
    "groupTitle": "Group"
  },
  {
    "type": "post",
    "url": "/member/group/shuffle",
    "title": "Shuffle giving array",
    "version": "1.0.0",
    "name": "GroupShuffle",
    "group": "Group",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Shuffle the members from members array into the giveTo. The username from the same index between the two arrays must be different. Can be called multiple times.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nickname of the user making the request.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "hash",
            "description": "<p>Hash of the user password.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "id",
            "description": "<p>Mongo _id of the group</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Determines if call was succesful or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>{text: &quot;Error message&quot;, &quot;error&quot;: call_stack_obj}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "group",
            "description": "<p>{name: &quot;Nasty people&quot;, memberLimit: 20, members[username1, username2], giveTo: [username2, username1]}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ success : true, group: { name: \"Nasty people\", members[username1, username2], giveTo: [username2, username1]}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ success : false, error: { text: \"Group not found.\"}}",
          "type": "json"
        }
      ]
    },
    "filename": "server/services/group.js",
    "groupTitle": "Group"
  },
  {
    "type": "get",
    "url": "/member/get",
    "title": "Get user info",
    "version": "1.0.0",
    "name": "GetUser",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Info about a user given by username.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nickname of the user making the request.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "hash",
            "description": "<p>Hash of the user password.</p>"
          }
        ]
      }
    },
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nickname of the user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Determines if call was succesful or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>{text: &quot;Error message&quot;, &quot;error&quot;: call_stack_obj}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>{username: &quot;username_test&quot;, email: &quot;vaild.email@gmail.com&quot;, firstname: &quot;Username&quot;, lastname: &quot;Text&quot;}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ success : true, user: {username: \"username_test\", email: \"vaild.email@gmail.com\", firstname: \"Username\", lastname: \"Text\"}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ success : false, error: { text: \"User not found.\"}}",
          "type": "json"
        }
      ]
    },
    "filename": "server/services/user.js",
    "groupTitle": "User"
  },
  {
    "type": "get",
    "url": "/member/me",
    "title": "Get authenticated user info",
    "version": "1.0.0",
    "name": "GetUserMe",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Info about the authenticated user.</p>",
    "header": {
      "fields": {
        "Header": [
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nickname of the user making the request.</p>"
          },
          {
            "group": "Header",
            "type": "String",
            "optional": false,
            "field": "hash",
            "description": "<p>Hash of the user password.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Determines if call was succesful or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>{text: &quot;Error message&quot;, &quot;error&quot;: call_stack_obj}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>{username: &quot;username_test&quot;, email: &quot;vaild.email@gmail.com&quot;, firstname: &quot;Username&quot;, lastname: &quot;Text&quot;}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ success : true, user: {username: \"username_test\", email: \"vaild.email@gmail.com\", firstname: \"Username\", lastname: \"Text\"}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ success : false, error: { text: \"User not found.\"}}",
          "type": "json"
        }
      ]
    },
    "filename": "server/services/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/login",
    "title": "Login a user",
    "version": "1.0.0",
    "name": "LoginUser",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Perform a login of an already existing user. Client must store the username and the hash once the answer is retrived. Posibile options for storing are cookies or localStorage.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nickname of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the new user.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Determines if call was succesful or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>{text: &quot;Error message&quot;, &quot;error&quot;: call_stack_obj}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>{username: &quot;username_test&quot;, hash: &quot;some_hash&quot;}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ success : true, user: { username: \"username_test\", hash: \"some_hash\"}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ success : false, error: { text: \"Wrong password.\"}}",
          "type": "json"
        }
      ]
    },
    "filename": "server/services/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/user/create",
    "title": "Create a new user",
    "version": "1.0.0",
    "name": "PostUser",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Create a new user identified by email, password, firstname and lastname.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nickname of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "password",
            "description": "<p>Password of the new user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "email",
            "description": "<p>Email of the user - must be valid.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "firstname",
            "description": "<p>The first name.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "lastname",
            "description": "<p>The last name.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Determines if call was succesful or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>{text: &quot;Error message&quot;, &quot;error&quot;: call_stack_obj}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>{username: &quot;username_test&quot;, hash: &quot;some_hash&quot;}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ success : true, user: { username: \"username_test\", hash: \"some_hash\"}}",
          "type": "json"
        }
      ]
    },
    "error": {
      "examples": [
        {
          "title": "Error-Response:",
          "content": "{ success : false, error: { text: \"Email not valid.\"}}",
          "type": "json"
        }
      ]
    },
    "filename": "server/services/user.js",
    "groupTitle": "User"
  },
  {
    "type": "post",
    "url": "/member/test",
    "title": "Test credentials",
    "version": "1.0.0",
    "name": "TestCredentials",
    "group": "User",
    "permission": [
      {
        "name": "none"
      }
    ],
    "description": "<p>Test username and hash are given correctly.</p> <p>Pass username and hash as parameters in the body of the request (for POST).</p> <p>Pass username and hash as url parameters (FOR GET).</p> <p>Pass username and hash as HTTP headers.</p>",
    "parameter": {
      "fields": {
        "Parameter": [
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "username",
            "description": "<p>Nickname of the user.</p>"
          },
          {
            "group": "Parameter",
            "type": "String",
            "optional": false,
            "field": "hash",
            "description": "<p>Given hash after register or login.</p>"
          }
        ]
      }
    },
    "success": {
      "fields": {
        "Success 200": [
          {
            "group": "Success 200",
            "type": "String",
            "optional": false,
            "field": "success",
            "description": "<p>Determines if call was succesful or not.</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "error",
            "description": "<p>{text: &quot;Error message&quot;, &quot;error&quot;: call_stack_obj}</p>"
          },
          {
            "group": "Success 200",
            "type": "Object",
            "optional": false,
            "field": "user",
            "description": "<p>{username: &quot;username_test&quot;, hash: &quot;some_hash&quot;}</p>"
          }
        ]
      },
      "examples": [
        {
          "title": "Success-Response:",
          "content": "{ success : true, message: \"Authenticated as ...\" }",
          "type": "json"
        }
      ]
    },
    "filename": "server/services/user.js",
    "groupTitle": "User"
  }
] });
