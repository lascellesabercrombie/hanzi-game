BEGIN;

DROP TABLE IF EXISTS unihan_characters;

CREATE TABLE unihan_characters (
    character TEXT PRIMARY KEY,
    kcantonese	TEXT,
    kdefinition	TEXT,
    kjapanese TEXT,
    kmandarin TEXT,
    khanyupinyin TEXT
    );

CREATE INDEX name ON unihan_characters USING GIN (to_tsvector(kdefinition));

COMMIT;