import json

def extract_characters(input_file):
    character_set = set()

    with open(input_file, 'r', encoding='utf-8') as infile:
        for line in infile:
            try:
                data = json.loads(line)
            except json.JSONDecodeError:
                continue

            character = data.get('character')
            if character:
                character_set.add(character)

    return character_set

input_file = 'makemeahanzi_dictionary.txt'
possible_characters = extract_characters(input_file)