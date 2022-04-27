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

**section**(array的array，占哪几节课) 

**classroom**（array of string)，不填为自由地点

​	例如day是[1，3]， oddEvenWeek是[0，1]，section是[[3，4]，[5，6]]，表明是周一的34节和单周周三的56节

**type**: 0，1，2，3，4分别代表  通修、平台、通识、核心、选修

**tea_id**(array)

**major_id**

**grade**

```
{
  "cs_id": "000000041",
  "cs_name": "中国近现代史纲要",
  "week_bg":1,
  "week_end":17,
  "day":[3],
  "oddEvenWeek":[0],
  "section":[[9,10,11]],
  "classroom":["逸B-313"],
  "type":0,
  "tea_id":["0000001"]
}
```

# classroom

**room_name**

**cs_ids**

# dep_major

dep_name

major_name
