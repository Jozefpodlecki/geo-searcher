import json
from os import path
from shutil import copyfile

directory_name = path.dirname(__file__)

countries_file_path = path.join(directory_name, "countries.json")
tags_file_path = path.join(directory_name, "tags.json")
countries_tags_file_path = path.join(directory_name, "countries_tags.json")
out_tags_file_name = path.join(directory_name, "../src/assets/tags.json")
out_countries_file_name = path.join(directory_name, "../src/assets/countries.json")

copyfile(countries_file_path, out_countries_file_name)

with open(countries_file_path, "r") as countries_file, \
    open(countries_tags_file_path, "r") as countries_tags_file, \
    open(tags_file_path, "r") as tags_file, \
    open(out_tags_file_name, "w") as out_tags_file:
    countries_tags = json.load(countries_tags_file)
    tags = json.load(tags_file)
    countries = json.load(countries_file)
    
    tags_dict = {tags[i]["value"]: tags[i]["type"] for i in range(0, len(tags), 1)}

    combined_tags_dict = {}
    combined_tags = []
    index = 0

    for country_tag in countries_tags:
        country = country_tag["iso3166-1-alpha-2"]

        for tag in country_tag["tags"]:
            tag_type = tags_dict.get(tag, "unknown")
            entry = combined_tags_dict.setdefault(tag, None)

            if entry is None:
                combined_tags_dict[tag] = {
                    "id": index,
                    "name": tag,
                    "type": tag_type,
                    "countries": []
                }
                index += 1

            tag_countries_list = combined_tags_dict[tag]["countries"]

            if country not in tag_countries_list:
                tag_countries_list.append(country)

    combined_tags = [value for key, value in combined_tags_dict.items()]

    json.dump(combined_tags, out_tags_file, indent=4, sort_keys=True)