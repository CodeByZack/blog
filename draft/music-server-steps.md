---
title: music-server-steps
created_at: '2025-02-06 10:42'
updated_at: '2025-02-11 06:07'
---

# 音乐流媒体服务器开发步骤

## 1. 项目准备与初始化
### 目标：
为开发环境和代码库做好基础设置，确保项目的可维护性和扩展性。

### 关键点：
- 创建 Node.js 项目并初始化。
- 安装所需的依赖，如 `express`、`mongoose`、`fluent-ffmpeg` 等。
- 设置项目文件夹结构（如 `src/`、`models/`、`controllers/`、`routes/`、`public/` 等）。

### 难点：
- 确保文件夹结构清晰，模块化，便于后期扩展。
- 配置数据库连接（MongoDB 或其他），确保数据的持久化。

---

## 2. 数据库设计与模型创建
### 目标：
设计数据库结构，用来存储音频文件的元数据（如标题、艺术家、专辑等）以及用户和播放记录。

### 关键点：
- **音频文件表（或集合）**：设计字段如 `title`、`artist`、`album`、`duration`、`filePath` 等。
- **用户表**：设计用户信息，包括 `username`、`password`（加密存储）、`role`（如普通用户、管理员）。
- **播放记录表（可选）**：记录用户的播放历史或收藏夹。
- **索引设计**：确保常用字段（如艺术家、专辑、标题等）有索引，以便高效查询。

### 难点：
- 如何处理大量音频文件时，数据库的查询效率和性能。
- 如何设计数据库模型以支持后期扩展，如添加更多元数据、支持更多功能。


<details>

<summary>prisma-scheme</summary>

prisma-scheme

```ts
generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "sqlite"
  url      = env("DATABASE_URL")
}

model album {
  id                       String              @id
  name                     String              @default("")
  artist_id                String              @default("")
  embed_art_path           String              @default("")
  artist                   String              @default("")
  album_artist             String              @default("")
  min_year                 Int                 @default(0)
  max_year                 Int                 @default(0)
  compilation              Unsupported("bool") @default(dbgenerated("FALSE"))
  song_count               Int                 @default(0)
  duration                 Float               @default(0)
  genre                    String              @default("")
  created_at               DateTime?
  updated_at               DateTime?
  full_text                String?             @default("")
  album_artist_id          String?             @default("")
  size                     Int                 @default(0)
  all_artist_ids           String?
  description              String              @default("")
  small_image_url          String              @default("")
  medium_image_url         String              @default("")
  large_image_url          String              @default("")
  external_url             String              @default("")
  external_info_updated_at DateTime?
  date                     String              @default("")
  min_original_year        Int                 @default(0)
  max_original_year        Int                 @default(0)
  original_date            String              @default("")
  release_date             String              @default("")
  releases                 Int                 @default(0)
  image_files              String              @default("")
  order_album_name         String              @default("")
  order_album_artist_name  String              @default("")
  sort_album_name          String              @default("")
  sort_album_artist_name   String              @default("")
  catalog_num              String              @default("")
  comment                  String              @default("")
  paths                    String              @default("")
  mbz_album_id             String              @default("")
  mbz_album_artist_id      String              @default("")
  mbz_album_type           String              @default("")
  mbz_album_comment        String              @default("")
  discs                    Json                @default("{}")
  library_id               Int                 @default(1)
  library                  library             @relation(fields: [library_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
  album_genres             album_genres[]

  @@index([updated_at], map: "album_updated_at")
  @@index([size], map: "album_size")
  @@index([order_album_name], map: "album_order_album_name")
  @@index([order_album_artist_name], map: "album_order_album_artist_name")
  @@index([name], map: "album_name")
  @@index([min_year], map: "album_min_year")
  @@index([mbz_album_type], map: "album_mbz_album_type")
  @@index([max_year], map: "album_max_year")
  @@index([genre], map: "album_genre")
  @@index([full_text], map: "album_full_text")
  @@index([created_at], map: "album_created_at")
  @@index([artist_id], map: "album_artist_id")
  @@index([album_artist_id], map: "album_artist_album_id")
  @@index([artist], map: "album_artist_album")
  @@index([artist], map: "album_artist")
  @@index([compilation, order_album_artist_name, order_album_name], map: "album_alphabetical_by_artist")
  @@index([all_artist_ids], map: "album_all_artist_ids")
}

model album_genres {
  album_id String
  genre_id String
  genre    genre  @relation(fields: [genre_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
  album    album  @relation(fields: [album_id], references: [id], onDelete: Cascade, onUpdate: NoAction)

  @@unique([album_id, genre_id], map: "sqlite_autoindex_album_genres_1")
}

model annotation {
  user_id    String              @default("")
  item_id    String              @default("")
  item_type  String              @default("")
  play_count Int?                @default(0)
  play_date  DateTime?
  rating     Int?                @default(0)
  starred    Unsupported("bool") @default(dbgenerated("FALSE"))
  starred_at DateTime?

  @@unique([user_id, item_id, item_type], map: "sqlite_autoindex_annotation_1")
  @@index([starred_at], map: "annotation_starred_at")
  @@index([starred], map: "annotation_starred")
  @@index([rating], map: "annotation_rating")
  @@index([play_date], map: "annotation_play_date")
  @@index([play_count], map: "annotation_play_count")
}

model artist {
  id                       String           @id
  name                     String           @default("")
  album_count              Int              @default(0)
  full_text                String?          @default("")
  song_count               Int              @default(0)
  size                     Int              @default(0)
  biography                String           @default("")
  small_image_url          String           @default("")
  medium_image_url         String           @default("")
  large_image_url          String           @default("")
  similar_artists          String           @default("")
  external_url             String           @default("")
  external_info_updated_at DateTime?
  order_artist_name        String           @default("")
  sort_artist_name         String           @default("")
  mbz_artist_id            String           @default("")
  artist_genres            artist_genres[]
  library_artist           library_artist[]

  @@index([size], map: "artist_size")
  @@index([order_artist_name], map: "artist_order_artist_name")
  @@index([name], map: "artist_name")
  @@index([full_text], map: "artist_full_text")
}

model artist_genres {
  artist_id String
  genre_id  String
  genre     genre  @relation(fields: [genre_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
  artist    artist @relation(fields: [artist_id], references: [id], onDelete: Cascade, onUpdate: NoAction)

  @@unique([artist_id, genre_id], map: "sqlite_autoindex_artist_genres_1")
}

model bookmark {
  user_id    String
  item_id    String
  item_type  String
  comment    String?
  position   Int?
  changed_by String?
  created_at DateTime?
  updated_at DateTime?
  user       user      @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@unique([user_id, item_id, item_type], map: "sqlite_autoindex_bookmark_1")
}

model genre {
  id                String              @id
  name              String              @unique(map: "sqlite_autoindex_genre_2")
  album_genres      album_genres[]
  artist_genres     artist_genres[]
  media_file_genres media_file_genres[]
}

model goose_db_version {
  id         Int       @id @default(autoincrement())
  version_id Int
  is_applied Int
  tstamp     DateTime? @default(now())
}

model library {
  id             Int              @id @default(autoincrement())
  name           String           @unique(map: "sqlite_autoindex_library_1")
  path           String           @unique(map: "sqlite_autoindex_library_2")
  remote_path    String?          @default("")
  last_scan_at   DateTime         @default(dbgenerated("'0000-00-00 00:00:00'"))
  updated_at     DateTime         @default(now())
  created_at     DateTime         @default(now())
  album          album[]
  library_artist library_artist[]
  media_file     media_file[]
}

model library_artist {
  library_id Int     @default(1)
  artist_id  String
  artist     artist  @relation(fields: [artist_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
  library    library @relation(fields: [library_id], references: [id], onDelete: Cascade, onUpdate: NoAction)

  @@unique([library_id, artist_id], map: "sqlite_autoindex_library_artist_1")
}

model media_file {
  id                      String              @id
  path                    String              @default("")
  title                   String              @default("")
  album                   String              @default("")
  artist                  String              @default("")
  artist_id               String              @default("")
  album_artist            String              @default("")
  album_id                String              @default("")
  has_cover_art           Unsupported("bool") @default(dbgenerated("FALSE"))
  track_number            Int                 @default(0)
  disc_number             Int                 @default(0)
  year                    Int                 @default(0)
  size                    Int                 @default(0)
  suffix                  String              @default("")
  duration                Float               @default(0)
  bit_rate                Int                 @default(0)
  genre                   String              @default("")
  compilation             Unsupported("bool") @default(dbgenerated("FALSE"))
  created_at              DateTime?
  updated_at              DateTime?
  full_text               String?             @default("")
  album_artist_id         String?             @default("")
  date                    String              @default("")
  original_year           Int                 @default(0)
  original_date           String              @default("")
  release_year            Int                 @default(0)
  release_date            String              @default("")
  order_album_name        String              @default("")
  order_album_artist_name String              @default("")
  order_artist_name       String              @default("")
  sort_album_name         String              @default("")
  sort_artist_name        String              @default("")
  sort_album_artist_name  String              @default("")
  sort_title              String              @default("")
  disc_subtitle           String              @default("")
  catalog_num             String              @default("")
  comment                 String              @default("")
  order_title             String              @default("")
  mbz_recording_id        String              @default("")
  mbz_album_id            String              @default("")
  mbz_artist_id           String              @default("")
  mbz_album_artist_id     String              @default("")
  mbz_album_type          String              @default("")
  mbz_album_comment       String              @default("")
  mbz_release_track_id    String              @default("")
  bpm                     Int                 @default(0)
  channels                Int                 @default(0)
  rg_album_gain           Float               @default(0)
  rg_album_peak           Float               @default(0)
  rg_track_gain           Float               @default(0)
  rg_track_peak           Float               @default(0)
  lyrics                  Json                @default("[]")
  sample_rate             Int                 @default(0)
  library_id              Int                 @default(1)
  library                 library             @relation(fields: [library_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
  media_file_genres       media_file_genres[]
  scrobble_buffer         scrobble_buffer[]

  @@index([year], map: "media_file_year")
  @@index([updated_at], map: "media_file_updated_at")
  @@index([disc_number, track_number], map: "media_file_track_number")
  @@index([title], map: "media_file_title")
  @@index([sample_rate], map: "media_file_sample_rate")
  @@index([path], map: "media_file_path_nocase")
  @@index([path], map: "media_file_path")
  @@index([order_title], map: "media_file_order_title")
  @@index([order_artist_name], map: "media_file_order_artist_name")
  @@index([order_album_name], map: "media_file_order_album_name")
  @@index([mbz_recording_id], map: "media_file_mbz_track_id")
  @@index([genre], map: "media_file_genre")
  @@index([full_text], map: "media_file_full_text")
  @@index([duration], map: "media_file_duration")
  @@index([created_at], map: "media_file_created_at")
  @@index([channels], map: "media_file_channels")
  @@index([bpm], map: "media_file_bpm")
  @@index([artist_id], map: "media_file_artist_id")
  @@index([album_artist_id], map: "media_file_artist_album_id")
  @@index([artist], map: "media_file_artist")
  @@index([album_id], map: "media_file_album_id")
  @@index([album_artist], map: "media_file_album_artist")
}

model media_file_genres {
  media_file_id String
  genre_id      String
  genre         genre      @relation(fields: [genre_id], references: [id], onDelete: Cascade, onUpdate: NoAction)
  media_file    media_file @relation(fields: [media_file_id], references: [id], onDelete: Cascade, onUpdate: NoAction)

  @@unique([media_file_id, genre_id], map: "sqlite_autoindex_media_file_genres_1")
}

model player {
  id               String               @id
  name             String
  user_agent       String?
  user_id          String
  client           String
  ip               String?
  last_seen        DateTime?
  max_bit_rate     Int?                 @default(0)
  transcoding_id   String?
  report_real_path Unsupported("bool")  @default(dbgenerated("FALSE"))
  scrobble_enabled Unsupported("bool")? @default(dbgenerated("true"))
  user             user                 @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@index([name], map: "player_name")
  @@index([client, user_agent, user_id], map: "player_match")
}

model playlist {
  id              String                @id
  name            String                @default("")
  comment         String                @default("")
  duration        Float                 @default(0)
  song_count      Int                   @default(0)
  public          Unsupported("bool")   @default(dbgenerated("FALSE"))
  created_at      DateTime?
  updated_at      DateTime?
  path            Unsupported("string") @default(dbgenerated("''"))
  sync            Unsupported("bool")   @default(dbgenerated("false"))
  size            Int                   @default(0)
  rules           String?
  evaluated_at    DateTime?
  owner_id        String
  user            user                  @relation(fields: [owner_id], references: [id], onDelete: Cascade)
  playlist_fields playlist_fields[]
  playlist_tracks playlist_tracks[]

  @@index([updated_at], map: "playlist_updated_at")
  @@index([size], map: "playlist_size")
  @@index([name], map: "playlist_name")
  @@index([evaluated_at], map: "playlist_evaluated_at")
  @@index([created_at], map: "playlist_created_at")
}

model playlist_fields {
  field       String
  playlist_id String
  playlist    playlist @relation(fields: [playlist_id], references: [id], onDelete: Cascade)

  @@unique([field, playlist_id], map: "playlist_fields_idx")
}

model playlist_tracks {
  id            Int      @default(0)
  playlist_id   String
  media_file_id String
  playlist      playlist @relation(fields: [playlist_id], references: [id], onDelete: Cascade)

  @@unique([playlist_id, id], map: "playlist_tracks_pos")
}

model playqueue {
  id         String    @id @default(cuid())
  user_id    String
  current    String?
  position   Float?
  changed_by String?
  items      String?
  created_at DateTime?
  updated_at DateTime?
  user       user      @relation(fields: [user_id], references: [id], onDelete: Cascade)
}

model property {
  id    String @id
  value String @default("")
}

model radio {
  id            String    @id
  name          String    @unique(map: "sqlite_autoindex_radio_2")
  stream_url    String
  home_page_url String    @default("")
  created_at    DateTime?
  updated_at    DateTime?

  @@index([name], map: "radio_name")
}

model scrobble_buffer {
  user_id       String
  service       String
  media_file_id String
  play_time     DateTime
  enqueue_time  DateTime   @default(now())
  id            String     @unique(map: "scrobble_buffer_id_ix") @default("")
  media_file    media_file @relation(fields: [media_file_id], references: [id], onDelete: Cascade)
  user          user       @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@unique([user_id, service, media_file_id, play_time], map: "sqlite_autoindex_scrobble_buffer_1")
}

model share {
  id              String              @id
  expires_at      DateTime?
  last_visited_at DateTime?
  resource_ids    String
  created_at      DateTime?
  updated_at      DateTime?
  user_id         String
  downloadable    Unsupported("bool") @default(dbgenerated("false"))
  description     String              @default("")
  resource_type   String              @default("")
  contents        String              @default("")
  format          String              @default("")
  max_bit_rate    Int                 @default(0)
  visit_count     Int                 @default(0)
  user            user                @relation(fields: [user_id], references: [id], onDelete: NoAction, onUpdate: NoAction)
}

model transcoding {
  id               String @id
  name             String @unique(map: "sqlite_autoindex_transcoding_2")
  target_format    String @unique(map: "sqlite_autoindex_transcoding_3")
  command          String @default("")
  default_bit_rate Int?   @default(192)
}

model user {
  id              String              @id
  user_name       String              @unique(map: "sqlite_autoindex_user_2") @default("")
  name            String              @default("")
  email           String              @default("")
  password        String              @default("")
  is_admin        Unsupported("bool") @default(dbgenerated("FALSE"))
  last_login_at   DateTime?
  last_access_at  DateTime?
  created_at      DateTime
  updated_at      DateTime
  bookmark        bookmark[]
  player          player[]
  playlist        playlist[]
  playqueue       playqueue[]         @ignore
  scrobble_buffer scrobble_buffer[]
  share           share[]
  user_props      user_props[]

  @@index([user_name, password], map: "user_username_password")
}

model user_props {
  user_id String
  key     String
  value   String?
  user    user    @relation(fields: [user_id], references: [id], onDelete: Cascade)

  @@id([user_id, key])
}
```

</details>

---

## 3. 扫描本地文件并提取元数据
### 目标：
实现扫描本地音乐文件夹，提取音频文件的元数据，并将其保存到数据库。

### 关键点：
- 递归扫描文件夹，查找音频文件。
- 使用音频处理库（如 `music-metadata`）提取音频文件的元数据。
- 将文件的元数据（如标题、艺术家、专辑、时长、格式等）保存到数据库。

### 难点：
- 如何有效地遍历文件夹，避免重复扫描已处理的文件。
- 处理不同类型音频文件的格式和编码（如 MP3、FLAC、OGG 等）。
- 如何处理损坏或不支持的音频文件，并确保不会导致程序崩溃。

---

## 4. 用户认证与权限管理
### 目标：
实现用户注册、登录、认证和权限管理，确保音频文件和其他资源的安全访问。

### 关键点：
- 用户注册和登录：使用 JWT 生成用户令牌来维持会话。
- 密码加密：使用 `bcrypt` 等库加密用户密码。
- 用户角色和权限：定义不同角色（如管理员、普通用户）以控制访问权限。
- **中间件**：创建中间件来验证 JWT 是否有效，确保用户已登录。

### 难点：
- 用户认证系统的安全性，确保密码不泄露且采用安全的加密方式。
- 如何管理用户权限，确保管理员可以执行更高权限的操作，普通用户只能访问自己的数据。

---

## 5. 音频流与播放功能
### 目标：
实现音频文件的流式传输，使用户可以在线播放音乐文件。

### 关键点：
- 支持 `Range` 请求：允许客户端请求音频文件的部分内容，这样可以实现按需加载（即在线播放）。
- 提供音频流 API：用户访问音频时，服务器根据请求的 `Range` 头返回音频流。
- 确保音频流的高效传输，避免内存占用过高。

### 难点：
- 如何处理不同大小的音频文件，尤其是大文件时，如何减少内存使用和优化传输速度。
- 需要处理浏览器端的音频播放兼容性问题，确保用户在不同设备上都能正常播放。

---

## 6. 音频文件管理 API
### 目标：
实现音频文件的增删查改操作接口，方便用户管理其音乐库。

### 关键点：
- **文件列表接口**：提供音频文件的查询接口，支持按艺术家、专辑、标题等字段进行搜索。
- **文件删除与修改**：支持删除音频文件、更新文件的元数据（如更改标题、艺术家等）。
- **音频排序与分页**：考虑到音频库可能会非常大，需要分页功能来优化查询速度。

### 难点：
- 如何设计 API，使其既简洁又功能全面，支持复杂的查询需求（如按时间、艺术家、专辑等过滤）。
- 数据量大的情况下，如何优化查询性能，避免数据库查询过慢。

---

## 7. 前端界面设计与实现
### 目标：
实现一个用户友好的前端界面，让用户可以浏览音乐库、播放音频、搜索音频等。

### 关键点：
- **音频播放器组件**：设计一个播放器，可以播放音频、暂停、跳过、调整音量等。
- **音频库展示**：展示音频列表，用户可以按艺术家、专辑、类型等分类浏览音频。
- **搜索与筛选**：提供音频的搜索和筛选功能，让用户能快速找到想要的音乐。
- **用户认证界面**：设计登录、注册和用户管理界面，允许用户登录和查看个人信息。

### 难点：
- 如何保证音频播放器的响应速度和稳定性，尤其是在播放大文件时。
- 前端与后端的集成，确保音频流顺畅地加载并播放。
- 确保良好的用户体验（如界面的简洁性、音频播放的流畅性等）。

---

## 8. 部署与优化
### 目标：
将系统部署到生产环境，并进行性能优化，确保系统稳定运行。

### 关键点：
- **部署方式**：使用 Docker 容器化应用，或将其部署到云平台（如 AWS、Heroku）。
- **负载均衡**：如果用户量较大，考虑使用负载均衡器来分配流量，避免服务器过载。
- **数据库优化**：使用合适的数据库索引，确保音频查询和文件上传等操作效率高。
- **音频缓存**：为提高音频流的加载速度，考虑使用缓存策略，如 CDN（内容分发网络）来加速音频文件传输。

### 难点：
- 如何确保系统能承受高并发访问，尤其是音频流传输时的带宽问题。
- 部署时需要配置多个环境（开发、测试、生产环境），确保配置的正确性。

---

## 9. 后期扩展与维护
### 目标：
在项目完成后，持续进行维护和功能扩展。

### 关键点：
- **功能扩展**：添加歌单、收藏夹、推荐系统等功能，丰富用户体验。
- **性能监控与调优**：定期监控系统性能，优化数据库查询和服务器资源使用。
- **用户反馈**：收集用户反馈，改进系统功能和界面设计。

### 难点：
- 如何处理大规模用户的数据，确保系统扩展性。
- 根据用户需求不断优化功能，避免功能膨胀，保持系统的可维护性。
