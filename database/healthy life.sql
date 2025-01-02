--------------------------------------------------------
--  File created - Tuesday-December-24-2024   
--------------------------------------------------------
--------------------------------------------------------
--  DDL for Sequence SEQ_ADMIN_ID
--------------------------------------------------------

   CREATE SEQUENCE  "C##CUKLIS"."SEQ_ADMIN_ID"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 21 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;
--------------------------------------------------------
--  DDL for Sequence SEQ_ARTIKEL_ID
--------------------------------------------------------

   CREATE SEQUENCE  "C##CUKLIS"."SEQ_ARTIKEL_ID"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 121 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;
--------------------------------------------------------
--  DDL for Sequence SEQ_OLAHRAGA_ID
--------------------------------------------------------

   CREATE SEQUENCE  "C##CUKLIS"."SEQ_OLAHRAGA_ID"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 141 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;
--------------------------------------------------------
--  DDL for Sequence SEQ_PENGGUNA_ID
--------------------------------------------------------

   CREATE SEQUENCE  "C##CUKLIS"."SEQ_PENGGUNA_ID"  MINVALUE 1 MAXVALUE 9999999999999999999999999999 INCREMENT BY 1 START WITH 461 CACHE 20 NOORDER  NOCYCLE  NOKEEP  NOSCALE  GLOBAL ;
--------------------------------------------------------
--  DDL for Table ADMIN
--------------------------------------------------------

  CREATE TABLE "C##CUKLIS"."ADMIN" 
   (	"ID_ADMIN" NUMBER(*,0), 
	"NAMA_PENGGUNA" VARCHAR2(100 BYTE), 
	"KATA_SANDI" VARCHAR2(255 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table ARTIKEL
--------------------------------------------------------

  CREATE TABLE "C##CUKLIS"."ARTIKEL" 
   (	"ID_ARTIKEL" NUMBER(*,0), 
	"JUDUL" VARCHAR2(255 BYTE), 
	"KONTEN" CLOB, 
	"ADMIN_ID_ADMIN" NUMBER(*,0), 
	"GAMBAR" VARCHAR2(3000 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" 
 LOB ("KONTEN") STORE AS SECUREFILE (
  TABLESPACE "USERS" ENABLE STORAGE IN ROW 4000 CHUNK 8192
  NOCACHE LOGGING  NOCOMPRESS  KEEP_DUPLICATES 
  STORAGE(INITIAL 262144 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)) ;
--------------------------------------------------------
--  DDL for Table DATA_OLAHRAGA
--------------------------------------------------------

  CREATE TABLE "C##CUKLIS"."DATA_OLAHRAGA" 
   (	"ID_OLAHRAGA" NUMBER(*,0), 
	"NAMA_OLAHRAGA" VARCHAR2(100 BYTE), 
	"KALORI_PER_SET" FLOAT(126), 
	"ADMIN_ID_ADMIN" NUMBER(*,0), 
	"GAMBAR" VARCHAR2(255 BYTE), 
	"LINK_VIDEO" VARCHAR2(255 BYTE), 
	"ESTIMASI_WAKTU" VARCHAR2(25 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table MAKANAN
--------------------------------------------------------

  CREATE TABLE "C##CUKLIS"."MAKANAN" 
   (	"ID" NUMBER(*,0), 
	"JUDUL" VARCHAR2(100 BYTE), 
	"KALORI" NUMBER(10,2), 
	"GAMBAR" VARCHAR2(4000 BYTE), 
	"RESEP" VARCHAR2(4000 BYTE), 
	"CARA_PEMBUATAN" VARCHAR2(3000 BYTE), 
	"ADMIN_ID_ADMIN" NUMBER(*,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table PENGGUNA
--------------------------------------------------------

  CREATE TABLE "C##CUKLIS"."PENGGUNA" 
   (	"ID_PENGGUNA" NUMBER(*,0), 
	"NAMA" VARCHAR2(100 BYTE), 
	"EMAIL" VARCHAR2(150 BYTE), 
	"KATA_SANDI" VARCHAR2(255 BYTE), 
	"USIA" NUMBER(*,0), 
	"JENIS_KELAMIN" CHAR(1 BYTE), 
	"BERAT_BADAN" FLOAT(126), 
	"TINGGI_BADAN" FLOAT(126), 
	"ADMIN_ID_ADMIN" NUMBER(*,0)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Table TRACKER
--------------------------------------------------------

  CREATE TABLE "C##CUKLIS"."TRACKER" 
   (	"ID_TRACKER" VARCHAR2(20 BYTE), 
	"TANGGAL" TIMESTAMP (6), 
	"KALORI_MASUK" NUMBER, 
	"KALORI_KELUAR" NUMBER, 
	"ID_PENGGUNA" NUMBER(38,0), 
	"MAKANAN_TRACKER" VARCHAR2(3000 BYTE), 
	"OLAHRAGA_TRACKER" VARCHAR2(3000 BYTE), 
	"TARGET_KALORI" NUMBER, 
	"STATUS_KALORI" VARCHAR2(50 BYTE)
   ) SEGMENT CREATION IMMEDIATE 
  PCTFREE 10 PCTUSED 40 INITRANS 1 MAXTRANS 255 
 NOCOMPRESS LOGGING
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
REM INSERTING into C##CUKLIS.ADMIN
SET DEFINE OFF;
Insert into C##CUKLIS.ADMIN (ID_ADMIN,NAMA_PENGGUNA,KATA_SANDI) values ('1','admin','$2y$10$y7tsyor8KEjlpMW2Jx/mveAGq1r.dWg9GrVLQf5OzWbL82qdqKUUS');
REM INSERTING into C##CUKLIS.ARTIKEL
SET DEFINE OFF;
Insert into C##CUKLIS.ARTIKEL (ID_ARTIKEL,JUDUL,ADMIN_ID_ADMIN,GAMBAR) values ('52','Diet Mediterania','1','https://froyonion.sgp1.digitaloceanspaces.com/images/blogdetail/c2fb1ec6f851472dc96e29a414848b193801ec7f.jpg');
Insert into C##CUKLIS.ARTIKEL (ID_ARTIKEL,JUDUL,ADMIN_ID_ADMIN,GAMBAR) values ('50','Diet Atkins','1','https://ashefagriyapusaka.co.id/wp-content/uploads/2023/11/diet-atkins-1.jpg');
Insert into C##CUKLIS.ARTIKEL (ID_ARTIKEL,JUDUL,ADMIN_ID_ADMIN,GAMBAR) values ('51','Diet Vegetarian','1','https://zakatsukses.org/wp-content/uploads/2024/02/nabila6.jpg');
Insert into C##CUKLIS.ARTIKEL (ID_ARTIKEL,JUDUL,ADMIN_ID_ADMIN,GAMBAR) values ('53',' Diet Paleo','1','https://assets.kompasiana.com/items/album/2016/05/28/paleo2-5748ed3dd17a61e204eb2736.jpeg?t=o&v=770');
Insert into C##CUKLIS.ARTIKEL (ID_ARTIKEL,JUDUL,ADMIN_ID_ADMIN,GAMBAR) values ('54','Diet Ultra Rendah Lemak','1','https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjRnW_wUzlwF_UbfczRhp7Mxkwv-Q311h52KwiPhmdsDU_rC6x3T6rSiN6D54X-Cmn7Ivv1HVCO4C1_sNgROMPuSc7I2MsLqO35Mgzci6hqLG8zB9NbRiW22F-6drwA_Y52Tb_f-3EGRGQ/s1600/Diet_Rendah_Lemak_Atau_Karbo.jpg');
Insert into C##CUKLIS.ARTIKEL (ID_ARTIKEL,JUDUL,ADMIN_ID_ADMIN,GAMBAR) values ('61','Pentingnya Tidur yang Cukup','1','https://asset.kompas.com/crops/eFH5uLuhP6yFr4H-t82an5bkbnA=/55x97:1410x1000/1200x800/data/photo/2023/03/26/641ffd77880e8.jpg');
REM INSERTING into C##CUKLIS.DATA_OLAHRAGA
SET DEFINE OFF;
Insert into C##CUKLIS.DATA_OLAHRAGA (ID_OLAHRAGA,NAMA_OLAHRAGA,KALORI_PER_SET,ADMIN_ID_ADMIN,GAMBAR,LINK_VIDEO,ESTIMASI_WAKTU) values ('1','Lompat Tali','10','1','https://blog.bioritmo.com.br/wp-content/uploads/2021/12/shutterstock_722394541-1.jpg','https://www.youtube.com/watch?v=N2NNUcABCME','1 menit');
Insert into C##CUKLIS.DATA_OLAHRAGA (ID_OLAHRAGA,NAMA_OLAHRAGA,KALORI_PER_SET,ADMIN_ID_ADMIN,GAMBAR,LINK_VIDEO,ESTIMASI_WAKTU) values ('81','High Knees','10','1','https://cdn.maskulin.com.my/2020/07/229945-28_21_296910.jpeg','https://www.youtube.com/watch?v=FvjmPRU3zn4','30 detik');
Insert into C##CUKLIS.DATA_OLAHRAGA (ID_OLAHRAGA,NAMA_OLAHRAGA,KALORI_PER_SET,ADMIN_ID_ADMIN,GAMBAR,LINK_VIDEO,ESTIMASI_WAKTU) values ('82','Jumping Jack','9','1','https://cdn.kibrispdr.org/data/377/gambar-jumping-jack-21.webp','https://www.youtube.com/watch?v=nGaXj3kkmrU','30 detik');
Insert into C##CUKLIS.DATA_OLAHRAGA (ID_OLAHRAGA,NAMA_OLAHRAGA,KALORI_PER_SET,ADMIN_ID_ADMIN,GAMBAR,LINK_VIDEO,ESTIMASI_WAKTU) values ('83','Jump Squats','14','1','https://www.maleultracore.com/blog/wp-content/uploads/2020/09/The-best-way-to-do-squat-jumps.jpg','https://www.youtube.com/watch?v=QQWsscOgGkU',' 1');
Insert into C##CUKLIS.DATA_OLAHRAGA (ID_OLAHRAGA,NAMA_OLAHRAGA,KALORI_PER_SET,ADMIN_ID_ADMIN,GAMBAR,LINK_VIDEO,ESTIMASI_WAKTU) values ('84','Mountain Climbers','11,9','1','https://media.hearstapps.com/loop/rw-jess-mountain-climber-1576012130.mp4/poster.jpg','https://www.youtube.com/watch?v=boBoWvFdjnI','1 Menit');
Insert into C##CUKLIS.DATA_OLAHRAGA (ID_OLAHRAGA,NAMA_OLAHRAGA,KALORI_PER_SET,ADMIN_ID_ADMIN,GAMBAR,LINK_VIDEO,ESTIMASI_WAKTU) values ('66','Senam Aerobik Ringan','75','1','https://radarpekalongan.disway.id/upload/075b7606e7851883b2bf5d680285dc0c.jpeg','https://www.youtube.com/watch?v=vSThNlE1snE&t=14s','15 Menit');
Insert into C##CUKLIS.DATA_OLAHRAGA (ID_OLAHRAGA,NAMA_OLAHRAGA,KALORI_PER_SET,ADMIN_ID_ADMIN,GAMBAR,LINK_VIDEO,ESTIMASI_WAKTU) values ('63','Yoga','37,5','1','https://www.static-src.com/wcsstore/Indraprastha/images/catalog/full//catalog-image/100/MTA-144660582/no-brand_no-brand_full01.jpg','https://www.youtube.com/watch?v=VFqs872DRxg','15 Menit');
Insert into C##CUKLIS.DATA_OLAHRAGA (ID_OLAHRAGA,NAMA_OLAHRAGA,KALORI_PER_SET,ADMIN_ID_ADMIN,GAMBAR,LINK_VIDEO,ESTIMASI_WAKTU) values ('24','High-Intensity Interval Training','120','1','https://www.yesdok.com/visual/slideshow/3c3debfd-8ca6-431f-b068-c9d9373905e4-article-1600601565.jpeg?w=1200','https://www.youtube.com/watch?v=w0OniyZ3gPM','15 Menit');
Insert into C##CUKLIS.DATA_OLAHRAGA (ID_OLAHRAGA,NAMA_OLAHRAGA,KALORI_PER_SET,ADMIN_ID_ADMIN,GAMBAR,LINK_VIDEO,ESTIMASI_WAKTU) values ('29','Bersepeda Intensif','450','1','https://radarbanyumas.disway.id/upload/1be5a9b06a7f28f63e10d756e986bb4a.jpg','https://www.youtube.com/watch?v=A_uQ4rE657Q','45 Menit');
REM INSERTING into C##CUKLIS.MAKANAN
SET DEFINE OFF;
Insert into C##CUKLIS.MAKANAN (ID,JUDUL,KALORI,GAMBAR,RESEP,CARA_PEMBUATAN,ADMIN_ID_ADMIN) values ('1','Salad Sayur','9','https://img-global.cpcdn.com/recipes/9de63605e81a59df/640x640sq70/photo.webp','"[\"Secukupnya selada hijau\",\"Secukupnya selada merah\",\"Secukupnya tomat ceri\",\"1\/2 buah paprika\",\"1 buah telur\",\"3 buah jamur\",\"1 buah lemon peras\",\"1 jumput himsalt\",\"1 jumput lada bubuk\",\"2 sdm thousand island\",\"2 lembar smoked beef\",\"1 sdt olive oil\"]"','"[\"Siapkan semua bahan.\",\"Tata selada, paprika, dan tomat dalam mangkok besar. Taburkan himsalt dan lada bubuk, lalu kucurkan perasan lemon.\",\"Panaskan wajan, tuang olive oil, masukkan irisan jamur dan smoked beef, aduk-aduk sebentar. Masukkan kocokan telur, orak-arik sampai matang. Tuang di atas mangkok berisi sayuran, tambahkan dressing thousand island.\",\"Salad siap disajikan.\"]"','1');
Insert into C##CUKLIS.MAKANAN (ID,JUDUL,KALORI,GAMBAR,RESEP,CARA_PEMBUATAN,ADMIN_ID_ADMIN) values ('2','Overnight Oat','307','https://img-global.cpcdn.com/steps/3b0ea78cf1fd5e33/640x640sq70/photo.webp','"[\"Secukupnya Oatmeal\",\"Secukupnya susu kedelai (aku pakai VSoy)\",\"1-2 buah strawberry yg sudah dicuci\",\"Sedikit chia seed\",\"Sedikit granola\"]"','"[\"Tuang oatmeal ke wadah kaca atau kotak makan\",\"Disusul dengan menuangkan susu kedelai (aku pakai VSoy) (jangan hanya becek, biarkan agak tenggelam sedikit karena oatmeal dan chia seed akan menyerap susu kedelai)\",\"Taburkan chia seed sesuai selera\",\"Diamkan dalam wadah tertutup dalam lemari es semalaman (bukan di freezer)\",\"Voila! Santap sebagai snack (iris strawberry dan taburkan sedikit granola utk memperkaya rasa dan tekstur - sebelum disantap - supaya strawberry dalam keadaan segar dan granola masih crunchy)\"]"','1');
Insert into C##CUKLIS.MAKANAN (ID,JUDUL,KALORI,GAMBAR,RESEP,CARA_PEMBUATAN,ADMIN_ID_ADMIN) values ('3','Simple Grilled Chicken','140','https://img-global.cpcdn.com/recipes/0c309b340a099df7/640x640sq70/photo.webp','"[\"500 gr ayam dada\",\"2 buah wortel\",\"3 kentang ukuuran besar\",\"1 bungkul brokoli\",\"2 sdm bumbu marinasi\",\"2 sdm kecap manis\",\"1 sdt garam\",\"1 sdt lada\",\"secukupnya oregano\",\"secukupnya margarin\"]"','"[\"Siapkan bahan. Daging ayam dada sudah dimarinasi malam sebelumnya pakai bumbu marinasi siap pakai ditambah garam, dan lada bubuk. Simpan dalam kulkas. Kupas kentang, cuci bersih lalu potong-potong ukuran sedang. Bilas hingga bersih. Rebus kentang hingga matang. Angkat dan tiriskan.\",\"Kupas dan cuci bersih wortel. Potong-potong brokoli dan rendam dengan air panas. Didihkan air, tambahkan garam lalu rebus brokoli dan wortel hingga matang crunchy. Grill kentang hingga kecoklatan, taburi oregano (bisa disajikan versi rebus jika suka).\",\"Panaskan grill pan. Panggang daging hingga keluar garis bakar. Balik hingga matang merata. Tambahkan margarin, balik sekali lagi. Tambahkan kecap manis (ops). Pastikan matang semua sisi. Angkat dan sajikan dengan kentang dan sayuran. Selamat mencoba.\"]"','1');
Insert into C##CUKLIS.MAKANAN (ID,JUDUL,KALORI,GAMBAR,RESEP,CARA_PEMBUATAN,ADMIN_ID_ADMIN) values ('4','Telur Buncis Labu Siam','114','https://img-global.cpcdn.com/recipes/77158bbea55a60af/640x640sq70/photo.webp','"[\"1 Telur ayam\",\"3 buah labu siam baby(buat lalap)\",\"8 buah buncis\"]"','"[\"Kocok telur kasih garam kemudia goreng dengan sedikit minyak\",\"Buncis potong jadi 2 bagian kemudian rebus\",\"Labu siam rebus setelah semua dah matang tata di piring bersama telur dan buncis makan bersama sambal terasi abc, jadilah cemilan sehat cocok buat yg lagi diet\"]"','1');
Insert into C##CUKLIS.MAKANAN (ID,JUDUL,KALORI,GAMBAR,RESEP,CARA_PEMBUATAN,ADMIN_ID_ADMIN) values ('7','Dimsum sehat tanpa tepung','49','https://img-global.cpcdn.com/recipes/b7a0f480fb2028dc/640x640sq70/photo.webp','"[\"500 gr filet paha ayam\",\"250 gr udang\",\"3 labu Siam kecil\",\"4 bawang putih\",\"5 bawang merah\",\"2 sdm saos tiram\",\"3 sdm kecap ikan\",\"2 sdm kecap asin\",\"1 sdt lada\",\"1 sdm penyedap\",\"3-4 sdm gula\",\"1 sdt kaldu\",\"1 lembar Nori\",\"1 putih telur\"]"','"[\"Cuci ayam,dan udang buang kulit nya\",\"Iris daun bawang,goreng bawang dan parut labu lalu peras airnya\",\"Masukkan bawang,ayam dan putih telur lalu Chopper\",\"Masukkan labu,daun bawang\",\"Masukkan kecap ikan,saos tiram,lada\",\"Masukkan gula,kaldu dan nutri gel\",\"Tambahkan udang cincang,aduk. Bentuk dan kukus\",\"Sajikan\"]"','1');
Insert into C##CUKLIS.MAKANAN (ID,JUDUL,KALORI,GAMBAR,RESEP,CARA_PEMBUATAN,ADMIN_ID_ADMIN) values ('6','Healthy Green Juice','204,8','https://img-global.cpcdn.com/recipes/d907d681250edd70/640x640sq70/photo.webp','"[\"3 buah (428 gram) Apple Granny Smith\",\"2 batang celery stalk\",\"1 buah kyuri\",\"1 buah lemon\",\"Sejempol jahe\",\"7 butir kurma buang bijinya\",\"Segenggam daun mint\",\"91 gram madu\",\"600 ml air mineral\",\"Secukupnya es batu\"]"','"[\"Siapkan bahan-bahan juice (maaf daun mint dan kurma lupa di foto). Rendam semua buah dan celery dgn air garam selama 15 menit lalu cuci satu persatu di bawah air mengalir sambil di gosok-gosok\",\"Potong-potong apel,kyuri,celery,lemon,jahe dan daun mint ke dlm wadah blender. Tambahkan air mineral dan madu,blender sampai halus\",\"Masukkan jg kurma (hampir kelupaan) blender kembali hingga halus. Saring juice,siapkan gelas saji,isi dgn es batu lalu tuang juice ke dlm gelas\",\"Juice siap di nikmati dingin\"]"','1');
Insert into C##CUKLIS.MAKANAN (ID,JUDUL,KALORI,GAMBAR,RESEP,CARA_PEMBUATAN,ADMIN_ID_ADMIN) values ('5','Bihun Kukus ','178','https://img-global.cpcdn.com/recipes/689bb258790344bc/640x640sq70/photo.webp','"[\"1 keping bihun (66g)\",\"1 butir telur\",\"daun bawang\",\"wortel\",\"secukupnya lada\",\"secukupnya garam\",\"2 siung bawang putih halus\"]"','"[\"Potong-potong wortel dan daun bawang\",\"Rebus bihun, kemudian potong-potong (optional)\",\"Campurkan semua bahan hingga merata\",\"Masukkan mi ke dalam wadah atau cetakan\",\"Kemudian kukus selama 15 menit\",\"Dan jadi deh bihun kukus fantasi... ^_^\"]"','1');
Insert into C##CUKLIS.MAKANAN (ID,JUDUL,KALORI,GAMBAR,RESEP,CARA_PEMBUATAN,ADMIN_ID_ADMIN) values ('8','Perkedel telur','213','https://img-global.cpcdn.com/recipes/6dd3f7ff229dbd5c/680x482cq70/perkedel-kentang-telur-foto-resep-utama.jpg','"[\"5 butir telur ayam, rebus, kupas, belah dua\",\"25 gram tepung tapioka\",\"150 gram jamur merang, cincang\",\"1\/2 sdt garam\",\"2 butir bawang merah, iris\",\"1 siung bawang putih, iris\",\"1 sdt lada\",\"1 sdt garam\"]"','"[\"Belah dua telur rebus dan ambil kuningnya lalu haluskan. Putih telurnya dicincang kasar, Bunda.\",\"Campur cincangan telur ayam, jamur merang, tepung tapioka, bumbu halus, dan kuning telur. Aduk sampai merata.\",\"Bagi adonan menjadi sepuluh bagian dan bentuk sesuai selera.\",\"Panaskan minyak, goreng hingga berwarna kuning kecokelatan lalu angkat.\",\"Hidangkan selagi hangat, Bunda.\",\"Catatan: Satu porsi perkedel telur berisi 2 buah perkedel.\"]"','1');
Insert into C##CUKLIS.MAKANAN (ID,JUDUL,KALORI,GAMBAR,RESEP,CARA_PEMBUATAN,ADMIN_ID_ADMIN) values ('9','Pindang telur','82','https://blue.kumparan.com/image/upload/fl_progressive,fl_lossy,c_fill,q_auto:best,w_640/v1610235235/xmxj67i5xsmgw5xwe9tz.jpg','"[\"5 butir telur ayam\",\"2 lembar daun salam\",\"500 ml air untuk merebus\",\"Irisan 1 sdm bawang merah\",\"Irisan 1 sdm bawang putih\",\"1 sdm air asam\",\"1 ruas lengkuas,iris\",\"1 sdt garam\"]"','"[\"Rebus telur dengan air dan semua bumbu dengan api sedang hingga telur matang dan air menyusut.\",\"Angkat telur lalu ketuk-ketuk kulit telur hingga retak. Masukkan kembali ke air rebusan lalu masak hingga air menyusut. Angkat.\",\"Kupas telur dan hidangkan, Bunda.\"]"','1');
Insert into C##CUKLIS.MAKANAN (ID,JUDUL,KALORI,GAMBAR,RESEP,CARA_PEMBUATAN,ADMIN_ID_ADMIN) values ('10','Tumis Genjer','77','https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrhyAxsPkP3yXQhIDsspNi2x6WjHqJQ71M2w&s','"[\"500 gram bunga genjer segar, potong 5 cm\",\"2 sdm minyak untuk menumis\",\"Irisan tipis 2 sdm bawang merah\",\"Irisan tipis 1 sdm bawang putih\",\"1 sdt terasi\",\"Irisan bulat 2 sdm cabai merah, buang isinya\",\"Irisan bulat 2 sdm cabai hijau, buang isinya.\",\"1 ruas lengkuas, iris\",\"2 lembar daun salam\",\"1 sdm garam\"]"','"[\"Panaskan 2 sdm minyak dan tumis irisan bawang merah dan bawang putih hingga layu dan aromanya keluar.\",\"Masukkan irisan bulat cabai merah, cabai hijau, terasi, garam, irisan lengkuas, daun salam, dan garam. Tumis kembali sampai layu.\",\"Masukkan potongan bunga genjer, tumis selama 5 menit hingga lalu, angkat.\",\"Hidangkan tumis genjer selagi hangat, Bunda.\"]"','1');
REM INSERTING into C##CUKLIS.PENGGUNA
SET DEFINE OFF;
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('442','fawwazonk','123@email.com','$2y$10$9mQxXZF.TdorQC48znOjOuw9MTwtY9sNu3ZTQkLkgX4QJmjH/2rWq','76','P','40','167','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('150','cuklis','cuklis@gmail.com','$2y$10$aVPwavZU3cUuF2fxYJwZxeM23ld02haLU2G6ewTVJz275uDPzvUqa','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('402','fda','@gad','$2y$10$oWmtsVCu0QYDKAu1Bj/5DOoTdjGl8gmGNSLAp.a6585M6s3uDtt4K','45','L','156','164','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('182','imut','imut@gmail.com','$2y$10$iZx.WHklRpZKKBMie5rPie.0TrgchCZt50hBdwg2Aqd86StV./z9C','20','L','77','178','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('184','Tama','Tama@gmail.com','$2y$10$1ggkrpSTSBEnPQJxwbcVHOrOx1PuaZuLVqNEyFGsbKAElyDWrcfKu','22','P','56','156','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('282','coba','coba@gmail.com','$2y$10$6iiwEwYb6qo4SvRQMfUCheWxHnCdf0WuIH4dFXvNKIT3CPZN3BL16','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('148','abim','abim@','$2y$10$ZHmLz7/NByrFQNzrOrR8kO4qZKvZEk6E6Kq8hIcrf2fjAS0VwZBBy','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('190','Tama','sdad@gmail.com','$2y$10$vnWb31eoK/TzfUABfakkHOi0dKQzW8tgF.8bRR32CJiGIL9jopj7K','1','L','11','111','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('186','AAA','aaa@gmail.com','$2y$10$8OuY4CSU1jfikw5wyi847OYiMjN6oniyXMvwZL0CkneGMHeNBBCuK','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('188','sss','ss@gmail.com','$2y$10$QLerUWZ1IJUUW0TaPsMW9uo7ZmP8XeUVtM2R03dAMUzPWosv4gkA.','11','L','11','111','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('242','fawwaz','dd@.com','$2y$10$REPloGtbJvRhWkbORLuuQe454N4usyJqV03bLxkKBM/c64BhccKuO','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('262','pbl','pbl@gmail.com','$2y$10$1ofFzvXPMuog3tdmDHoURevyHA4tuWGRR91z4gQEcEEWGT06qr9EK','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('264','hi','hi@gmail.com','$2y$10$.hh.nocNsltxN/NfntuLQu7F33.BCDrkAeOIzpOtBFnyZ2Ai2oW7i','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('266','tama','tama@gmail.com','$2y$10$4khgFBWPypo14LmQSNTRDOMMpbHAQuOOF42.tNi/zNP/uRXdsK4B.','19','L','48','176','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('268','halo','halo@gmail.com','$2y$10$o5hRklbsFkzHNtU3srSPLeW.Z9X.BeMNWBWT0am4lVGRQPx1YdiaO','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('270','wa','wa@.com','$2y$10$4XvjPiKXTi8B1EvruHI97u8T8qJx55SMuvgoato5rzqKhZdLosl3G','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('272','tes2','tes45@','$2y$10$nKKBMrVVM4P/4IGxBjy.MOrZDsNN7.eVhKnRkbEQGJ5LScjzTO.Yq','19','L','53','165','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('274','gew','gew@','$2y$10$nwiXVwpfdpg1j7zs8ikIIOY2h0zZMFQjowfN/ox8tTlDXOzOFgmIm','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('276','tyu','hf@','$2y$10$XtTW/xJTS86wugRaXJeM5.bMgqTusVoca776Fp18IojU50G/MY5ye','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('278','tes4','tes21@','$2y$10$Se7iYIhDJrsj0yRKMU7GzO3J6jYTUI0fzJws0dc.H8Ngdq97Bc1v6','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('302','grsa','dfsffes@gmail.com','$2y$10$ZGhI2di1Y0h/BCsNViEEg.P9uckFnDoYWCrZfZUGVhPNDBJz3reLC','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('304','babi','babi@gmail.com','$2y$10$7VShxAjg1BjIg3HAYVbFJuuNrR8jeDGC/X6WWU86S7/FiRJA57w7W','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('422','cihuy','@cihuywrw','$2y$10$AfLB.8ugad04m9e.bFkXZOSB6o4DTwFoduGw1a6WiADzTj3D0cAoS','53','P','56','124','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('322','fawwaz','hh@email.com','$2y$10$ol1vt/zNC.SJ9WV8Q3nwEeoqRPF7zeZOEnjAVN.GAfRMTDxBYwNKi','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('324','muktia','hhaaa@email.com','$2y$10$2VkndbIBRWKbpEI2gMsGGOeVrDSLX1F0KR5d/mjX4D8.AU2i1pjkm','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('328','abc','abc@email.com','$2y$10$EYYcfuwTY6NF.COlsqofdekYcTRlej/w1q4Xt9A90lVHz.9vAVy4m','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('164','aufa','aufa@gmail.com','$2y$10$CjZvC6eqS3.0Xr0kTWSNxeEvzUfHQ7DQIV8WPu5bdFQVr.ddPVq0y','16','L','170','89','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('192','ikal','ikal@gmail.com','$2y$10$NNc3wtnF54JyNNHV4YMWkO.F8zAgCmSzOa7ibigGBWqeBwGWjLSXm','19','L','75','179','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('162','admin','admin@gmail.com','$2y$10$y7tsyor8KEjlpMW2Jx/mveAGq1r.dWg9GrVLQf5OzWbL82qdqKUUS','22','P','167','56','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('202','hamba tuhan','hamba@gmail.com','$2y$10$rE3CpMXQMXRlKTe/4/ZcoOD5cp8JIeAEcXpWA59LUcOaOfmCfnOp.','29','L','80','198','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('222','123','a@email.com','$2y$10$hMYeQlrBOMy3hNRJkGcjFOoVTEfBY23NraKQ1NSCyjLzeTRCnEORC','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('224','tes','tes@','$2y$10$JBMAGye/hl6GgEpZ2a6/yeKu/ScRHtEl/jUxiFQ51RoqZCspcxL9K','19','L','45','178','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('226','jdnjdnjn','djndj@email','$2y$10$JtINYrwLxFdns/Pl7qGf3uM2OhoFwif6AXNBJ87/YB/KWffsyFebW','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('228','a','s@','$2y$10$Yw.MFk3Eht4x6anf5pTZIOxhz8wUAowtkp58wzcBwCfre2AwqTWRa','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('336','bos','ww@email.com','$2y$10$qszE5ls97Bq1TJyXcf4bhO0c43C8XDn2bl4M82lnoAA/xgCW1pyd.','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('332','kurumi','hahaha@email.com','$2y$10$L7u3616gpUD9wZqywADDdeww/zQg22srZjtcH7G9Z5PUzL8KzHoXS','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('334','bus','h@email.com','$2y$10$1yEfqUKC0QlMQYJNL9.sNOsud2CpdS.XCjAFjnjZF.L9uQa78aRam','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('338','bios','w@email.com','$2y$10$NGXS9UrrNFci4.X4PhfCT.JEHApuZT.mIJbS5fnoZTOsuakhHPtxW','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('346','ngetes','wwee@email.com','$2y$10$eFkYJzPom1l1idg7kJSK0eWylB/K28QXyqM8q0IOQNCZ9XfSlIGku','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('342','bias','buu@gmail.com','$2y$10$D9fyRM4NtoJZ68H3JLnOFOB90yeLc.wp40jzrFSdGKgHoj72CknUq','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('344','hihi','we@email.com','$2y$10$fjaUPli3PL26eIsZdMVAA..QjZSHuqt1MPsmwr0Q8N2gpzodgbZP6','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('348','jojo','w@.com','$2y$10$02Z8nHYj2jGU4zdQxpIVEef32IFkxXnsacx0jCvaDveHotSzXOjRS','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('350','jojo','wu@.com','$2y$10$wxBWqCSvVAcJQjikgLR1renVBsIPJzxA2ydVnL44CTQE5vQkSuqKO','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('352','user','ee@email.com','$2y$10$XeU.TWWjz7gkBD9O3dntWOMxt/01z63Fx7X7g6ty.4kZ2J20gDhVi','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('354','user1','email@emaik','$2y$10$EDpretpqAV.3MREfY7KsNez.Rm9rYm1e/6yK2Fv9BRBxinbqIoqKu','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('356','uui','@ww','$2y$10$ooMEVa6IOIJPOA0eL/yLqeLx9HfRdE8b9HBx0WQnduhhfxBJ0uUrK','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('358','uui','@wo','$2y$10$U6i3Szq5yxPHmxh4Gbmz2.o7YwT7mqumT9uzbLgUJqNJIkhUjE8Xq','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('360','io','wo@wo.com','$2y$10$9rLIA9ncVdOvtHnW5aV93.Wj0.Sm.geFnQuqqXyr5rJ5HTJ9xKSi2','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('362','io','eo@wo.com','$2y$10$.apPEAlvvDo6/JsWEbvp6.GJpb7zJDot5Uc7i4naA3/jcthStWVju','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('364','ii','po@wo.com','$2y$10$VI/ln.5vWbvKEUiLPrwk7u9l3IwJ/g9WFkdJ07HQsw26wb.sovQHK','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('366','ngetest','@remail.com','$2y$10$C5oD88/j08CGMT8E46kyCOoxvOeLaZhvaBp5vXKkWcfVLuGBCgu4a','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('368','ngetest','@reemail.com','$2y$10$Ny3.gvMDi3EhKqkDFHUUSeQOxP66M0ZFnkPYc8ldyR.bSNPyIQ6Z2','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('370','ngetest','@reeeeeeemail.com','$2y$10$djOkwtAItdS6lDYQNijWTuVtSpowNdAMwjA4SjgGFuzJni2MFvAO2','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('372','deed','@eee','$2y$10$MncKcNUQ5mQdsFgJG86gLuqpwVEyVM3OnU1BJDXYDtwN18FXK6SZa','18','L','50','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('374','deed','@eeee','$2y$10$kCZf9AlDcbmL7sRXebncVev8TiOycAkcfRvtXL65/xm35IxbNbPu6','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('376','wwe','wwe@email.com','$2y$10$gqJ4.usjSlRUeT8KaFHSQuIm0k4SQg311vWDqF3LOTQBYvwECArry','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('378','username','email@fjkdfjk','$2y$10$2eXnXBqizUUX.6J7o8kaiOKIVk7Ryc3KLw2EtVygBi63iJxTXBU22','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('380','username','email@fjeekdfjk','$2y$10$d2fuk0225Y/84WzWVP56aeU3X4xQ3wix5rnz7MVOcmWwo3NwDCSzq','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('382','ngetestttt','tetetete@email.com','$2y$10$qezJoF1I2H5LfpzMgpZdzeo5OGCkApDJfRX1v44bwM6mgOAp5f8vm','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('384','ngetestttt','teteteete@email.com','$2y$10$twJmLsPZr5/bcG5RPwVhfe45ZYL2hsp0otv/O1bZ9dvyW9by8B9my','18','L','60','170','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('390','fawwazonkkk','apalah@email.com','$2y$10$Aj84z0lvxIv6nnyr8asOm.7pZZi6a0AG7ucKD1zwiEZEVTF5JX6eK','21','P','47','142','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('388','by u','emailE@email.com','$2y$10$.32iXkv0lrlP5gjYtnqiIuagN2H97KajycvgsZQ8b5RAyqWTV1dE.','19','L','55','178','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('444','bekam','bekam122@gmail.com','$2y$10$Lnhn2OXuxIeXlzRBeLhkge4C6qsJ5mmey7DtvRdyjvGq5eGc0c.1e','32','L','56','134','1');
Insert into C##CUKLIS.PENGGUNA (ID_PENGGUNA,NAMA,EMAIL,KATA_SANDI,USIA,JENIS_KELAMIN,BERAT_BADAN,TINGGI_BADAN,ADMIN_ID_ADMIN) values ('394','fgghcgcghcg','eeeeeeee@email.com','$2y$10$.nJxG303sSONjYidDoPWwOBBIHpLh3xUnd0ZvX7BKR55SaqrHclrq','23','L','47','176','1');
REM INSERTING into C##CUKLIS.TRACKER
SET DEFINE OFF;
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734774660193',to_timestamp('21-12-2024 16.51.00,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'100','200','394','[{"name":"ketoprak","calories":100}]','[{"name":"pusp up","calories":100},{"name":"sit up","calories":100}]','1500','Defisit Kalori');
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734773927733',to_timestamp('21-12-2024 16.38.47,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'100','100','394','[{"name":"fds","calories":100}]','[{"name":"sad","calories":100}]','1000','Seimbang');
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734774168011',to_timestamp('21-12-2024 16.42.48,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'100','100','394','[{"name":"ewqe","calories":100}]','[{"name":"ewqe","calories":100}]','1000','Seimbang');
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734503940512',to_timestamp('18-12-2024 13.39.00,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'1862','533','266','[{"name":"gg","calories":55},{"name":"gg","calories":44}]','[{"name":"k","calories":434},{"name":"ff","calories":44},{"name":"gg","calories":55}]',null,null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734504158912',to_timestamp('18-12-2024 13.42.38,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'1862','533','266','[{"name":"gg","calories":55},{"name":"gg","calories":44}]','[{"name":"k","calories":434},{"name":"ff","calories":44},{"name":"gg","calories":55}]',null,null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734504249283',to_timestamp('18-12-2024 13.44.09,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'1862','533','266','[{"name":"gg","calories":55},{"name":"gg","calories":44}]','[{"name":"k","calories":434},{"name":"ff","calories":44},{"name":"gg","calories":55}]',null,null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734511833730',to_timestamp('18-12-2024 15.50.33,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'2900','600','266','"[{\"name\":\"nasi\",\"calories\":200}]"','"[{\"name\":\"lari\",\"calories\":600}]"',null,null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734503554768',to_timestamp('18-12-2024 13.32.34,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'48','77','266','[{"name":"nasi","calories":33},{"name":"milo","calories":15}]','[{"name":"push up","calories":44},{"name":"sit up","calories":33}]',null,null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734504334624',to_timestamp('18-12-2024 13.45.34,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'1862','533','266','[{"name":"gg","calories":55},{"name":"gg","calories":44}]','[{"name":"k","calories":434},{"name":"ff","calories":44},{"name":"gg","calories":55}]',null,null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734511697258',to_timestamp('18-12-2024 15.48.17,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'3300','500','266','"[{\"name\":\"nasi goreng\",\"calories\":300}]"','"[{\"name\":\"lari\",\"calories\":500}]"',null,null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734511922801',to_timestamp('18-12-2024 15.52.02,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'2100','300','266','"[{\"name\":\"nasi\",\"calories\":100}]"','"[{\"name\":\"Renang\",\"calories\":300}]"',null,null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734512308058',to_timestamp('18-12-2024 15.58.28,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'44499','55','266','"[{\"name\":\"hh\",\"calories\":55}]"','"[{\"name\":\"gg\",\"calories\":55}]"',null,null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734512391969',to_timestamp('18-12-2024 15.59.51,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'4488','44','266','"[{\"name\":\"gg\",\"calories\":44}]"','"[{\"name\":\"gg\",\"calories\":44}]"',null,null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734513595009',to_timestamp('18-12-2024 16.19.55,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'1453','44','266','[{"name":"milo","calories":21}]','[{"name":"swnam","calories":44}]',null,null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734513953517',to_timestamp('18-12-2024 16.25.53,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'1453','44','266','[{"name":"milo","calories":21}]','[{"name":"swnam","calories":44}]',null,null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734514034281',to_timestamp('18-12-2024 16.27.14,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'3396','63','266','[{"name":"jagung","calories":30},{"name":"saus","calories":33}]','[{"name":"push up","calories":30},{"name":"sit up","calories":33}]',null,null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734515888751',to_timestamp('18-12-2024 16.58.08,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'1090','40','266','[{"name":"bubur ayam","calories":50},{"name":"soto","calories":40}]','[{"name":"push up","calories":20},{"name":"sit up","calories":20}]',null,null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734517220078',to_timestamp('18-12-2024 17.20.20,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'100','100','266','[{"name":"bubur","calories":100}]','[{"name":"push up","calories":100}]','1000',null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734517750021',to_timestamp('18-12-2024 17.29.10,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'100','100','266','[{"name":"bubur ayam","calories":100}]','[{"name":"push up","calories":100}]','1000',null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734517849061',to_timestamp('18-12-2024 17.30.49,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'100','100','266','[{"name":"soto ayam","calories":100}]','[{"name":"jogging","calories":100}]','1000',null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734518046037',to_timestamp('18-12-2024 17.34.06,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'200','300','266','[{"name":"bubur ayam","calories":100},{"name":"soto ayam","calories":100}]','[{"name":"jogging","calories":100},{"name":"push up","calories":100},{"name":"sit up","calories":100}]','1000',null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734697410949',to_timestamp('20-12-2024 19.23.30,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'45','68','266','[{"name":"gorengan","calories":45}]','[{"name":"Sepeda","calories":22},{"name":"Lari","calories":46}]','0',null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734697731147',to_timestamp('20-12-2024 19.28.51,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'33','78','266','[{"name":"sphagetti","calories":33}]','[{"name":"Senam","calories":45},{"name":"Yoga","calories":33}]','0',null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734697845354',to_timestamp('20-12-2024 19.30.45,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'33','78','266','[{"name":"sphagetti","calories":33}]','[{"name":"Senam","calories":45},{"name":"Yoga","calories":33}]','3431',null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734698017356',to_timestamp('20-12-2024 19.33.37,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'33','78','266','[{"name":"sphagetti","calories":33}]','[{"name":"Senam","calories":45},{"name":"Yoga","calories":33}]','3431',null);
Insert into C##CUKLIS.TRACKER (ID_TRACKER,TANGGAL,KALORI_MASUK,KALORI_KELUAR,ID_PENGGUNA,MAKANAN_TRACKER,OLAHRAGA_TRACKER,TARGET_KALORI,STATUS_KALORI) values ('TRK1734917858572',to_timestamp('23-12-2024 08.37.38,000000000','DD-MM-RRRR HH24.MI.SSXFF'),'400','200','444','[{"name":"bubur ayam","calories":300},{"name":"cimol","calories":100}]','[{"name":"pusp up","calories":100},{"name":"sit up","calories":100}]','1859','Surplus Kalori');
--------------------------------------------------------
--  DDL for Index ADMIN_NAMA_PENGGUNA_UN
--------------------------------------------------------

  CREATE UNIQUE INDEX "C##CUKLIS"."ADMIN_NAMA_PENGGUNA_UN" ON "C##CUKLIS"."ADMIN" ("NAMA_PENGGUNA") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index ADMIN_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "C##CUKLIS"."ADMIN_PK" ON "C##CUKLIS"."ADMIN" ("ID_ADMIN") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index ARTIKEL_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "C##CUKLIS"."ARTIKEL_PK" ON "C##CUKLIS"."ARTIKEL" ("ID_ARTIKEL") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index DATA_OLAHRAGA_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "C##CUKLIS"."DATA_OLAHRAGA_PK" ON "C##CUKLIS"."DATA_OLAHRAGA" ("ID_OLAHRAGA") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index MAKANAN_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "C##CUKLIS"."MAKANAN_PK" ON "C##CUKLIS"."MAKANAN" ("ID") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index PENGGUNA_EMAIL_UN
--------------------------------------------------------

  CREATE UNIQUE INDEX "C##CUKLIS"."PENGGUNA_EMAIL_UN" ON "C##CUKLIS"."PENGGUNA" ("EMAIL") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Index PENGGUNA_PK
--------------------------------------------------------

  CREATE UNIQUE INDEX "C##CUKLIS"."PENGGUNA_PK" ON "C##CUKLIS"."PENGGUNA" ("ID_PENGGUNA") 
  PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS" ;
--------------------------------------------------------
--  DDL for Trigger TRG_ADMIN_ID
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "C##CUKLIS"."TRG_ADMIN_ID" 
    BEFORE INSERT ON admin 
    FOR EACH ROW 
BEGIN
    :NEW.id_admin := seq_admin_id.NEXTVAL;
END;

/
ALTER TRIGGER "C##CUKLIS"."TRG_ADMIN_ID" ENABLE;
--------------------------------------------------------
--  DDL for Trigger TRG_ARTIKEL_ID
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "C##CUKLIS"."TRG_ARTIKEL_ID" 
    BEFORE INSERT ON artikel 
    FOR EACH ROW 
BEGIN
    :NEW.id_artikel := seq_artikel_id.NEXTVAL;
END;

/
ALTER TRIGGER "C##CUKLIS"."TRG_ARTIKEL_ID" ENABLE;
--------------------------------------------------------
--  DDL for Trigger TRG_OLAHRAGA_ID
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "C##CUKLIS"."TRG_OLAHRAGA_ID" 
    BEFORE INSERT ON data_olahraga 
    FOR EACH ROW 
BEGIN
    :NEW.id_olahraga := seq_olahraga_id.NEXTVAL;
END;

/
ALTER TRIGGER "C##CUKLIS"."TRG_OLAHRAGA_ID" ENABLE;
--------------------------------------------------------
--  DDL for Trigger TRG_PENGGUNA_ID
--------------------------------------------------------

  CREATE OR REPLACE EDITIONABLE TRIGGER "C##CUKLIS"."TRG_PENGGUNA_ID" 
    BEFORE INSERT ON pengguna 
    FOR EACH ROW 
BEGIN
    :NEW.id_pengguna := seq_pengguna_id.NEXTVAL;
END;

/
ALTER TRIGGER "C##CUKLIS"."TRG_PENGGUNA_ID" ENABLE;
--------------------------------------------------------
--  Constraints for Table TRACKER
--------------------------------------------------------

  ALTER TABLE "C##CUKLIS"."TRACKER" MODIFY ("ID_TRACKER" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."TRACKER" MODIFY ("TANGGAL" NOT NULL ENABLE);
--------------------------------------------------------
--  Constraints for Table MAKANAN
--------------------------------------------------------

  ALTER TABLE "C##CUKLIS"."MAKANAN" MODIFY ("ID" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."MAKANAN" MODIFY ("ADMIN_ID_ADMIN" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."MAKANAN" ADD CONSTRAINT "MAKANAN_PK" PRIMARY KEY ("ID")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table DATA_OLAHRAGA
--------------------------------------------------------

  ALTER TABLE "C##CUKLIS"."DATA_OLAHRAGA" MODIFY ("ID_OLAHRAGA" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."DATA_OLAHRAGA" MODIFY ("NAMA_OLAHRAGA" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."DATA_OLAHRAGA" MODIFY ("ADMIN_ID_ADMIN" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."DATA_OLAHRAGA" ADD CONSTRAINT "DATA_OLAHRAGA_KALORI_CK" CHECK (kalori_per_set >= 0) ENABLE;
  ALTER TABLE "C##CUKLIS"."DATA_OLAHRAGA" ADD CONSTRAINT "DATA_OLAHRAGA_PK" PRIMARY KEY ("ID_OLAHRAGA")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table PENGGUNA
--------------------------------------------------------

  ALTER TABLE "C##CUKLIS"."PENGGUNA" MODIFY ("ID_PENGGUNA" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."PENGGUNA" MODIFY ("NAMA" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."PENGGUNA" MODIFY ("EMAIL" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."PENGGUNA" MODIFY ("KATA_SANDI" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."PENGGUNA" MODIFY ("USIA" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."PENGGUNA" MODIFY ("JENIS_KELAMIN" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."PENGGUNA" MODIFY ("BERAT_BADAN" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."PENGGUNA" MODIFY ("TINGGI_BADAN" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."PENGGUNA" MODIFY ("ADMIN_ID_ADMIN" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."PENGGUNA" ADD CONSTRAINT "PENGGUNA_USIA_CK" CHECK (usia > 0) ENABLE;
  ALTER TABLE "C##CUKLIS"."PENGGUNA" ADD CONSTRAINT "PENGGUNA_JENIS_KELAMIN_CK" CHECK (jenis_kelamin IN ('L', 'P')) ENABLE;
  ALTER TABLE "C##CUKLIS"."PENGGUNA" ADD CONSTRAINT "PENGGUNA_BERAT_BADAN_CK" CHECK (berat_badan > 0) ENABLE;
  ALTER TABLE "C##CUKLIS"."PENGGUNA" ADD CONSTRAINT "PENGGUNA_TINGGI_BADAN_CK" CHECK (tinggi_badan > 0) ENABLE;
  ALTER TABLE "C##CUKLIS"."PENGGUNA" ADD CONSTRAINT "PENGGUNA_PK" PRIMARY KEY ("ID_PENGGUNA")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
  ALTER TABLE "C##CUKLIS"."PENGGUNA" ADD CONSTRAINT "PENGGUNA_EMAIL_UN" UNIQUE ("EMAIL")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table ADMIN
--------------------------------------------------------

  ALTER TABLE "C##CUKLIS"."ADMIN" MODIFY ("ID_ADMIN" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."ADMIN" MODIFY ("NAMA_PENGGUNA" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."ADMIN" MODIFY ("KATA_SANDI" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."ADMIN" ADD CONSTRAINT "ADMIN_PK" PRIMARY KEY ("ID_ADMIN")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
  ALTER TABLE "C##CUKLIS"."ADMIN" ADD CONSTRAINT "ADMIN_NAMA_PENGGUNA_UN" UNIQUE ("NAMA_PENGGUNA")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Constraints for Table ARTIKEL
--------------------------------------------------------

  ALTER TABLE "C##CUKLIS"."ARTIKEL" MODIFY ("ID_ARTIKEL" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."ARTIKEL" MODIFY ("JUDUL" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."ARTIKEL" MODIFY ("KONTEN" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."ARTIKEL" MODIFY ("ADMIN_ID_ADMIN" NOT NULL ENABLE);
  ALTER TABLE "C##CUKLIS"."ARTIKEL" ADD CONSTRAINT "ARTIKEL_PK" PRIMARY KEY ("ID_ARTIKEL")
  USING INDEX PCTFREE 10 INITRANS 2 MAXTRANS 255 COMPUTE STATISTICS 
  STORAGE(INITIAL 65536 NEXT 1048576 MINEXTENTS 1 MAXEXTENTS 2147483645
  PCTINCREASE 0 FREELISTS 1 FREELIST GROUPS 1
  BUFFER_POOL DEFAULT FLASH_CACHE DEFAULT CELL_FLASH_CACHE DEFAULT)
  TABLESPACE "USERS"  ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table ARTIKEL
--------------------------------------------------------

  ALTER TABLE "C##CUKLIS"."ARTIKEL" ADD CONSTRAINT "ARTIKEL_ADMIN_FK" FOREIGN KEY ("ADMIN_ID_ADMIN")
	  REFERENCES "C##CUKLIS"."ADMIN" ("ID_ADMIN") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table DATA_OLAHRAGA
--------------------------------------------------------

  ALTER TABLE "C##CUKLIS"."DATA_OLAHRAGA" ADD CONSTRAINT "DATA_OLAHRAGA_ADMIN_FK" FOREIGN KEY ("ADMIN_ID_ADMIN")
	  REFERENCES "C##CUKLIS"."ADMIN" ("ID_ADMIN") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table MAKANAN
--------------------------------------------------------

  ALTER TABLE "C##CUKLIS"."MAKANAN" ADD CONSTRAINT "MAKANAN_ADMIN_FK" FOREIGN KEY ("ADMIN_ID_ADMIN")
	  REFERENCES "C##CUKLIS"."ADMIN" ("ID_ADMIN") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table PENGGUNA
--------------------------------------------------------

  ALTER TABLE "C##CUKLIS"."PENGGUNA" ADD CONSTRAINT "PENGGUNA_ADMIN_FK" FOREIGN KEY ("ADMIN_ID_ADMIN")
	  REFERENCES "C##CUKLIS"."ADMIN" ("ID_ADMIN") ENABLE;
--------------------------------------------------------
--  Ref Constraints for Table TRACKER
--------------------------------------------------------

  ALTER TABLE "C##CUKLIS"."TRACKER" ADD CONSTRAINT "FK_ID_PENGGUNA" FOREIGN KEY ("ID_PENGGUNA")
	  REFERENCES "C##CUKLIS"."PENGGUNA" ("ID_PENGGUNA") ENABLE;
