# login

**username**

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

**cs_id**（感觉应该用定长字符串类型，但是wx的云数据库没有这种类型）

**cs_name**

**week**(array，哪几周上课)

**day**(array，一周中的哪几天)

**section**(array的array，占哪几节课) 

​	例如day是{1，3}， section是{{3，4}，{5，6}}，表明是周一的34节和周三的56节

**type**

**classroom**

**tea_id**(array)

# classroom

