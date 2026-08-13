from pathlib import Path
from pypdf import PdfReader
from datetime import datetime
from datetime import timedelta
import re
import json
import random


PDF_FILE = (
    Path(__file__).resolve().parent.parent.parent
    / "data"
    / "raw"
    / "landslide"
    / "seattle_landslide_report.pdf"
)

OUTPUT_FILE = (
    Path(__file__).resolve().parent.parent.parent
    / "data"
    / "raw"
    / "landslide"
    / "seattle_landslide_dates.json"
)


reader = PdfReader(PDF_FILE)

# Table 1-1 is on PDF page 42.
# pypdf uses zero-based indexing, so page 42 = index 41.
page = reader.pages[49]

text = page.extract_text() or ""


# Match dates such as:
# March 20, 1978
# January 17, 1984
# October 20, 2003

pattern = (
    r"(January|February|March|April|May|June|July|August|"
    r"September|October|November|December)"
    r"\s+\d{1,2},\s+\d{4}"
)

dates = re.findall(pattern, text)


# The regex above captures only the month.
# Use a full-date regex instead.

full_pattern = (
    r"(?:January|February|March|April|May|June|July|August|"
    r"September|October|November|December)"
    r"\s+\d{1,2},\s+\d{4}"
)

dates = re.findall(full_pattern, text)


records = []

for date in dates:
    date_object = datetime.strptime(
        date,
        "%B %d, %Y"
    )

    records.append({
        "date": date_object.strftime("%Y-%m-%d"),
        "landslide": 1
    })


with open(
    OUTPUT_FILE,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        records,
        file,
        indent=4
    )


print("=" * 60)
print("LANDSLIDE DATE EXTRACTION")
print("=" * 60)

print("Dates extracted:", len(records))

print("\nFirst 10 dates:")

for record in records[:10]:
    print(
        record["date"],
        "-> landslide:",
        record["landslide"]
    )

print("\nSaved to:")
print(OUTPUT_FILE)

parsed_dates = []

for record in records:
    date_object = datetime.strptime(
        record["date"],
        "%Y-%m-%d"
    )

    parsed_dates.append(date_object)


unique_dates = set(parsed_dates)

print()
print("Total dates:", len(parsed_dates))
print("Unique dates:", len(unique_dates))

print()
print("Earliest date:", min(unique_dates).strftime("%Y-%m-%d"))
print("Latest date:", max(unique_dates).strftime("%Y-%m-%d"))

print()
print("Sorted first 10 dates:")

for date in sorted(unique_dates)[:10]:
    print(date.strftime("%Y-%m-%d"))

start_date = min(unique_dates)
end_date = max(unique_dates)

all_negative_dates = []

current_date = start_date

while current_date <= end_date:

    if current_date not in unique_dates:

        all_negative_dates.append(current_date)

    current_date += timedelta(days=1)


# Select the same negative dates every time
random.seed(42)

selected_negative_dates = random.sample(
    all_negative_dates,
    len(unique_dates)
)


negative_dates = []

for date in selected_negative_dates:

    negative_dates.append({
        "date": date.strftime("%Y-%m-%d"),
        "landslide": 0
    })


print()
print("Available negative dates:", len(all_negative_dates))

print(
    "Selected negative dates:",
    len(negative_dates)
)

print()
print("First 10 selected negative dates:")

for record in negative_dates[:10]:

    print(
        record["date"],
        "-> landslide:",
        record["landslide"]
    )

# Combine positive and negative samples

labels = records + negative_dates

# Sort chronologically

labels.sort(key=lambda x: x["date"])


LABEL_FILE = (
    Path(__file__).resolve().parent.parent.parent
    / "data"
    / "raw"
    / "landslide"
    / "seattle_landslide_labels.json"
)


with open(
    LABEL_FILE,
    "w",
    encoding="utf-8"
) as file:

    json.dump(
        labels,
        file,
        indent=4
    )


print()
print("=" * 60)
print("LABEL DATASET CREATED")
print("=" * 60)

print("Total samples:", len(labels))

print(
    "Landslide samples:",
    sum(x["landslide"] == 1 for x in labels)
)

print(
    "Non-landslide samples:",
    sum(x["landslide"] == 0 for x in labels)
)

print()
print("Saved to:")
print(LABEL_FILE)