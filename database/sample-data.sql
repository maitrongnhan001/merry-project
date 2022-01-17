/*--------------------SAMPLE DATA SQL----------------------*/


/*-----------------------DATA USER-------------------------*/
INSERT INTO user (
    id,
    email,
    password,
    DOB,
    firstName,
    lastName,
    sex,
    image
) VALUES (
    1,
    'nguyenvanan@gmail.com',
    'an@12345',
    '2000-02-12',
    'An',
    'Nguyển Văn',
    '0',
    'avatar-1.jpeg'
);

INSERT INTO user (
    id,
    email,
    password,
    DOB,
    firstName,
    lastName,
    sex,
    image
) VALUES (
    2,
    'phanvantung@gmail.com',
    'tung@12345',
    '1999-03-11',
    'Tùng',
    'Phan Văn',
    '0',
    'avatar-2.jpeg'
);

INSERT INTO user (
    id,
    email,
    password,
    DOB,
    firstName,
    lastName,
    sex,
    image
) VALUES (
    3,
    'lethuyduong@gmail.com',
    'duong@12345',
    '2000-05-09',
    'Dương',
    'Lê Thuỳ',
    '1',
    'avatar-3.jpeg'
);

INSERT INTO user (
    id,
    email,
    password,
    DOB,
    firstName,
    lastName,
    sex,
    image
) VALUES (
    4,
    'nguyenleanhtu@gmail.com',
    'tu@12345',
    '2000-11-20',
    'Tú',
    'Nguyễn Lê Anh',
    '0',
    'avatar-4.jpeg'
);

INSERT INTO user (
    id,
    email,
    password,
    DOB,
    firstName,
    lastName,
    sex,
    image
) VALUES (
    5,
    'tranhuyentrang@gmail.com',
    'trang@12345',
    '2001-10-20',
    'Trang',
    'Trần Huyền',
    '0',
    'avatar-5.jpeg'
);

/*----------------------END DATA USER----------------------*/

/*------------------------DATA GROUP-----------------------*/
INSERT INTO groupuser (
    id,
    groupName,
    AdminId,
    image) 
VALUES (
    'U0001',
    '',
    NULL,
    NULL
);

INSERT INTO groupuser (
    id,
    groupName,
    AdminId,
    image) 
VALUES (
    'U0002',
    '',
    NULL,
    NULL
);

INSERT INTO groupuser (
    id,
    groupName,
    AdminId,
    image) 
VALUES (
    'U0003',
    '',
    NULL,
    NULL
);

INSERT INTO groupuser (
    id,
    groupName,
    AdminId,
    image) 
VALUES (
    'U0004',
    '',
    NULL,
    NULL
);

INSERT INTO groupuser (
    id,
    groupName,
    AdminId,
    image) 
VALUES (
    'G0005',
    'Tối nay ăn gì??',
    '1',
    'avatar-group-1'
);
/*----------------------END DATA GROUP---------------------*/

/*--------------------DATA DETAIL GROUP--------------------*/
INSERT INTO detailgroup (
	groupId,
  	userId
)
VALUES (
	'U0001',
    1
);

INSERT INTO detailgroup (
	groupId,
    userId
)
VALUES (
	'U0001',
    2
);

INSERT INTO detailgroup (
	groupId,
  	userId
)
VALUES (
	'U0002',
    1
);

INSERT INTO detailgroup (
	groupId,
    userId
)
VALUES (
	'U0002',
    3
);

INSERT INTO detailgroup (
	groupId,
  	userId
)
VALUES (
	'U0003',
    1
);

INSERT INTO detailgroup (
	groupId,
    userId
)
VALUES (
	'U0003',
    4
);

INSERT INTO detailgroup (
	groupId,
  	userId
)
VALUES (
	'U0004',
    1
);

INSERT INTO detailgroup (
	groupId,
    userId
)
VALUES (
	'U0004',
    5
);

INSERT INTO detailgroup (
	groupId,
  	userId
)
VALUES (
	'G0005',
    1
);

INSERT INTO detailgroup (
	groupId,
    userId
)
VALUES (
	'G0005',
    2
);

INSERT INTO detailgroup (
	groupId,
    userId
)
VALUES (
	'G0005',
    3
);

INSERT INTO detailgroup (
	groupId,
    userId
)
VALUES (
	'G0005',
    4
);

INSERT INTO detailgroup (
	groupId,
    userId
)
VALUES (
	'G0005',
    5
);
/*------------------END DATA DETAIL GROUP------------------*/

/*-----------------------DATA MESSAGE----------------------*/
INSERT INTO message (
    id,
    time,
    emotion,
    sendId,
    receiveId,
    status
) VALUES (
    1,
    "2017-08-15 19:30:10",
    '',
    1,
    'U0001',
    'Đã xem'
);

INSERT INTO message (
    id,
    time,
    emotion,
    sendId,
    receiveId,
    status
) VALUES (
    2,
    "2017-08-15 19:31:10",
    '',
    2,
    'U0001',
    'Đã xem'
);

INSERT INTO message (
    id,
    time,
    emotion,
    sendId,
    receiveId,
    status
) VALUES (
    3,
    "2017-08-15 19:32:10",
    '',
    1,
    'U0001',
    'Đã xem'
);

INSERT INTO message (
    id,
    time,
    emotion,
    sendId,
    receiveId,
    status
) VALUES (
    4,
    "2017-08-15 19:32:10",
    '',
    1,
    'U0001',
    'Đã xem'
);

INSERT INTO message (
    id,
    time,
    emotion,
    sendId,
    receiveId,
    status
) VALUES (
    5,
    "2017-08-15 19:33:10",
    '',
    2,
    'U0001',
    'Đã nhận'
);

INSERT INTO message (
    id,
    time,
    emotion,
    sendId,
    receiveId,
    status
) VALUES (
    6,
    "2017-08-15 19:31:10",
    '',
    1,
    'G0005',
    'Đã xem'
);

INSERT INTO message (
    id,
    time,
    emotion,
    sendId,
    receiveId,
    status
) VALUES (
    7,
    "2017-08-15 19:31:10",
    '',
    2,
    'G0005',
    'Đã xem'
);

INSERT INTO message (
    id,
    time,
    emotion,
    sendId,
    receiveId,
    status
) VALUES (
    8,
    "2017-08-15 19:32:10",
    '',
    3,
    'G0005',
    'Đã xem'
);

INSERT INTO message (
    id,
    time,
    emotion,
    sendId,
    receiveId,
    status
) VALUES (
    9,
    "2017-08-15 19:32:10",
    '',
    4,
    'G0005',
    'Đã xem'
);

INSERT INTO message (
    id,
    time,
    emotion,
    sendId,
    receiveId,
    status
) VALUES (
    10,
    "2017-08-15 19:33:10",
    '',
    5,
    'G0005',
    'Đã nhận'
);
/*---------------------END DATA MESSAGE--------------------*/

/*-----------------------TEXT MESSAGE----------------------*/
INSERT INTO textmessage (
	id,
    content,
    messageId
) VALUES (
	1,
    'Hello, đi câu cá không, ra chỗ tao nè, bao êm luôn',
    1
);

INSERT INTO textmessage (
	id,
    content,
    messageId
) VALUES (
	2,
    'Oke, tao cũng đang chán, mà đi mấy giờ m, qua chở tao được không, làm biếng chạy xe quá',
    2
);

INSERT INTO textmessage (
	id,
    content,
    messageId
) VALUES (
	3,
    'OK, 12h tao chạy qua',
    3
);

INSERT INTO textmessage (
	id,
    content,
    messageId
) VALUES (
	4,
    '12h đêm',
    4
);

INSERT INTO textmessage (
	id,
    content,
    messageId
) VALUES (
	5,
    'đù, tới công chuyện',
    5
);

INSERT INTO textmessage (
	id,
    content,
    messageId
) VALUES (
	6,
    'Hello',
    6
);

INSERT INTO textmessage (
	id,
    content,
    messageId
) VALUES (
	7,
    'lô lô gì, quen biết gì không mà lô',
    7
);

INSERT INTO textmessage (
	id,
    content,
    messageId
) VALUES (
	8,
    'what, đây là đâu?? tao là ai????',
    8
);


/*---------------------END TEXT MESSAGE--------------------*/

/*----------------------MEDIA MESSAGE----------------------*/
INSERT INTO mediamessage (
	id,
    path,
    messageId
) VALUES (
	1,
    'message-image-1.jpeg',
    9
);

INSERT INTO mediamessage (
	id,
    path,
    messageId
) VALUES (
	2,
    'message-document-1.doc',
    10
);
/*--------------------END MEDIA MESSAGE--------------------*/

/*---------------------WAITING REQUEST---------------------*/
INSERT INTO waitingresquest (
	sendId,
    receiveId
) VALUES (
	1,
    2
);

INSERT INTO waitingresquest (
	sendId,
    receiveId
) VALUES (
	2,
    4
);
/*-------------------END WAITING REQUEST-------------------*/

/*------------------------DATA FRIEND----------------------*/
INSERT INTO friend (
	sendId,
    receiveId
) VALUES (
	1,
    3
);

INSERT INTO friend (
	sendId,
    receiveId
) VALUES (
	4,
    5
);
/*----------------------END DATA FRIEND--------------------*/