import requests
from pathlib import Path
from datetime import datetime, timedelta

# ============================================================
# SETTINGS
# ============================================================

OUTPUT_FOLDER = Path("../../data/raw/gridrad")

# Hurricane Harvey period
START_DATE = datetime(2017, 8, 20)
END_DATE = datetime(2017, 8, 20)

# NCAR GridRad V3.1 file server
BASE_URL = (
    "https://tds.gdex.ucar.edu/thredds/fileServer/"
    "files/g/d841000/201708/"
)

# ============================================================
# CREATE OUTPUT FOLDER
# ============================================================

OUTPUT_FOLDER.mkdir(parents=True, exist_ok=True)

# ============================================================
# DOWNLOAD FILES
# ============================================================

current_date = START_DATE

while current_date <= END_DATE:

    for hour in range(12):

        timestamp = current_date.replace(
            hour=hour,
            minute=0,
            second=0
        )

        filename = (
            f"nexrad_3d_v3_1_"
            f"{timestamp.strftime('%Y%m%dT%H%M%S')}Z.nc"
        )

        url = BASE_URL + filename

        output_file = OUTPUT_FOLDER / filename

        # Don't download files we already have
        if output_file.exists():
            file_size = output_file.stat().st_size

            # GridRad files should be much larger than a few MB.
              # Treat very small files as incomplete downloads.
            if file_size > 20 * 1024 * 1024:
                print(f"Already downloaded: {filename}")
                continue
            else:
                print(f"Incomplete file found, redownloading: {filename}")
                output_file.unlink()

        print(f"\nDownloading: {filename}")
        print(url)

        try:

            response = requests.get(
                url,
                stream=True,
                timeout=120
            )

            if response.status_code == 200:

                with open(output_file, "wb") as file:

                    for chunk in response.iter_content(
                        chunk_size=1024 * 1024
                    ):
                        if chunk:
                            file.write(chunk)

                print("Downloaded successfully!")

            else:

                print(
                    f"Download failed: "
                    f"HTTP {response.status_code}"
                )

        except Exception as e:

            print(
                f"Error downloading {filename}: {e}"
            )

    current_date += timedelta(days=1)

print("\n====================================")
print("DOWNLOAD COMPLETE")
print("====================================")