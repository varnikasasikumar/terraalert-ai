import json
from pathlib import Path
from collections import Counter


LABEL_FILE = (
    Path(__file__).resolve().parent.parent.parent
    / "data"
    / "raw"
    / "landslide"
    / "seattle_landslide_labels.json"
)


with open(LABEL_FILE, "r", encoding="utf-8") as file:
    labels = json.load(file)


print("=" * 60)
print("LANDSLIDE LABEL DATASET INSPECTION")
print("=" * 60)

print("Total samples:", len(labels))

counts = Counter(
    record["landslide"]
    for record in labels
)

print("Landslide = 1:", counts[1])
print("Landslide = 0:", counts[0])


print("\nFirst 10 records:")

for record in labels[:10]:
    print(record)


print("\nLast 10 records:")

for record in labels[-10:]:
    print(record)


dates = [
    record["date"]
    for record in labels
]

print("\nTotal unique dates:", len(set(dates)))

print("\n" + "=" * 60)