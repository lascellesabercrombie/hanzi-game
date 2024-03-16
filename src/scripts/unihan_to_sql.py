def convert_to_sql(input_file, output_file):
    with open(input_file, 'r', encoding='utf-8') as infile, open(output_file, 'w', encoding='utf-8') as outfile:
        for _ in range(start_line):
            next(infile) 
        for line in infile:
            if line.strip():
                parts = line.strip().split('\t')
                unicode_char = parts[0]
                try:
                    attribute = parts[1].lower()
                    value = parts[2]
                except IndexError:
                    attribute = "Unknown"
                    value = "Unknown"

            sql_statement = (
    f"INSERT INTO unihan_characters (character, {attribute}) "
    f"VALUES ('{unicode_char}', '{value}') "
    f"ON CONFLICT (character) DO "
    f"UPDATE SET {attribute} = '{value}' "
    f"WHERE unihan_characters.character = '{unicode_char}';\n"
)
            valid_attributes = ["kcantonese", "kdefinition", "kjapanese", "kmandarin", "khanyupinyin"]
            if attribute in valid_attributes:
              outfile.write(sql_statement)

input_file = 'Unihan_Readings.txt'
output_file = 'character_info_inserts.sql'
start_line = 31
convert_to_sql(input_file, output_file)