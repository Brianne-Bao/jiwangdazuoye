# login

**username**（即stu_id/tea_id）

**type**(0为学生，1为老师)

**password**

# student

**stu_id**

**stu_name**

**cs_ids**

# teacher

**tea_id**

**tea_name**

**cs_ids**

# course



```js
{
    "cs_id": "000000041",
    "cs_name": "中国近现代史纲要",
    "week_bg": 1,
    "week_end": 17,
    "time_loc": [
        {
            "day": "z",
            "oddEvenWeek": "每周",
            "section_bg": 9,
            "section_end": 11,
            "building": "逸B",
            "classroom": "313",
    	}
    ],
    "department":"软件学院",
    "grade":"2020",
    "type": "核心",
    "teachers": [
        {"tea_id":"0000001"，“tea_name":"黄俊"}
    ]
}
```

# classroom

**room_name**

**cs_ids**

```js
{
  building: "逸B",
  room: "313",
  cs_ids: ["000000041"]
}
```



