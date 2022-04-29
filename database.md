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

**cs_id**

**cs_name**

**week_bg**(起始周数)

**week_end**（结束周数）

**day**(array，一周中的哪几天)，不填为自由时间

**oddEvenWeek**(array,单双周，0不分单双周，1单周上课，2双周上课)

**section**(array的array，占哪几节课，每项里有两个数字，分别是课的起始和结束节数) 

**classroom**（array of string)，不填为自由地点

​	例如day是[1，3]， oddEvenWeek是[0，1]，section是[[3，5]，[5，6]]，表明是周一的3-5节和单周周三的56节

**type**:  通修、平台、通识、核心、选修

**tea_id**(array)

**major_name**

**grade**

```js
{
    "cs_id": "000000041",
    "cs_name": "中国近现代史纲要",
    "week_bg": 1,
    "week_end": 17,
    "time_loc": [
        {
            "day": 3,
            "oddEvenWeek": 0,
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
        {"tea_id":"0000001"}
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



# dep_major

dep_name

major_name
