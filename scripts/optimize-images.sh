#!/bin/bash
# Convert JPG/PNG images in a folder (recursively) to resized WebP and remove the originals.
# Usage: scripts/optimize-images.sh public/photos/photography
# Requires: cwebp (brew install webp) and sips (macOS).
# Remember to update the file extensions where the images are referenced in src/.

set -euo pipefail

DIR="${1:-}"
MAX_SIDE="${MAX_SIDE:-1800}"
QUALITY="${QUALITY:-82}"

if [ -z "$DIR" ] || [ ! -d "$DIR" ]; then
  echo "Usage: $0 <folder>" >&2
  exit 1
fi

find "$DIR" -type f \( -iname '*.jpg' -o -iname '*.jpeg' -o -iname '*.png' \) -print0 |
while IFS= read -r -d '' img; do
  out="${img%.*}.webp"
  w=$(sips -g pixelWidth "$img" | awk '/pixelWidth/ {print $2}')
  h=$(sips -g pixelHeight "$img" | awk '/pixelHeight/ {print $2}')

  resize=()
  if [ "$w" -ge "$h" ] && [ "$w" -gt "$MAX_SIDE" ]; then resize=(-resize "$MAX_SIDE" 0); fi
  if [ "$h" -gt "$w" ] && [ "$h" -gt "$MAX_SIDE" ]; then resize=(-resize 0 "$MAX_SIDE"); fi

  cwebp -quiet -q "$QUALITY" -m 6 ${resize[@]+"${resize[@]}"} "$img" -o "$out"
  echo "$img -> $out ($(( $(stat -f%z "$img") / 1024 )) KB -> $(( $(stat -f%z "$out") / 1024 )) KB)"
  rm "$img"
done
