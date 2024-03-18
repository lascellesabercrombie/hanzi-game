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
CREATE FUNCTION immutable_tsvector(text) RETURNS tsvector AS $$
BEGIN
    RETURN to_tsvector('simple', $1);
END;
$$ LANGUAGE plpgsql IMMUTABLE;

CREATE INDEX unihan_character_index ON unihan_characters USING gin(immutable_tsvector(kdefinition));

COMMIT;