from pathlib import Path
from pypdf import PdfReader


PDF_FILE = (
    Path(__file__).resolve().parent.parent.parent
    / "data"
    / "raw"
    / "landslide"
    / "seattle_landslide_report.pdf"
)


print("=" * 60)
print("INSPECTING SEATTLE LANDSLIDE REPORT")
print("=" * 60)

reader = PdfReader(PDF_FILE)

print("Number of pages:", len(reader.pages))

print("\nSearching for landslide-date information...")

matches = []

for page_number, page in enumerate(reader.pages, start=1):

    text = page.extract_text() or ""

    text_lower = text.lower()

    if (
        "appendix 1" in text_lower
        or "landslide date" in text_lower
        or "date inventories" in text_lower
    ):
        matches.append(page_number)

        print(
            f"\nPossible relevant page: {page_number}"
        )

        # Print a small portion of the page
        # so we can identify the appendix.
        index = text_lower.find("appendix")

        if index == -1:
            index = text_lower.find("landslide date")

        if index == -1:
            index = 0

        print(text[index:index + 1000])


print("\n" + "=" * 60)
print("SEARCH COMPLETE")
print("=" * 60)

print("Relevant pages found:", matches)

print("\n" + "=" * 60)
print("EXTRACTING LANDSLIDE DATABASE 1")
print("=" * 60)

# PDF page numbers are zero-indexed in pypdf.
# We inspect PDF page 50 here.
page = reader.pages[49]

text = page.extract_text() or ""

print(text)