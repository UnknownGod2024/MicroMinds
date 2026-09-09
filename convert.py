import os
from PIL import Image
from pillow_heif import register_heif_opener

register_heif_opener()

base_path = r"C:\Users\Arnav Bhandari\DJS_MICROMINDS\MicroMinds\public\team"
input_file = os.path.join(base_path, "Sushant.HEIC")
output_file = os.path.join(base_path, "Sushant.jpg")

if os.path.exists(input_file):
    print("Converting:", input_file)
    image = Image.open(input_file)
    image.convert('RGB').save(output_file, 'JPEG')
    print("Conversion successful:", output_file)
else:
    print("File not found:", input_file)
