#!/bin/bash

# Image optimization script
# Converts images to WebP format and reduces their size

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

echo -e "${GREEN}Starting image optimization...${NC}"

# Photography images
echo -e "${YELLOW}Optimizing photography images...${NC}"
cd public/photos/photography

# Create webp directory if it doesn't exist
mkdir -p webp

# Convert JPEG images to WebP with reduced quality
for img in *.jpeg *.jpg; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        name="${filename%.*}"
        webp_path="webp/${name}.webp"
        
        echo "Converting $img to WebP..."
        
        # Use cwebp to convert to WebP with reduced quality
        cwebp -q 80 "$img" -o "$webp_path"
        
        # Get file sizes
        original_size=$(stat -f%z "$img")
        webp_size=$(stat -f%z "$webp_path")
        
        # Calculate reduction percentage
        reduction=$((100 - (webp_size * 100 / original_size)))
        
        echo -e "${GREEN}✓ $img -> $webp_path (${reduction}% smaller)${NC}"
    fi
done

# Also optimize PNG images
for img in *.png; do
    if [ -f "$img" ]; then
        filename=$(basename "$img")
        name="${filename%.*}"
        webp_path="webp/${name}.webp"
        
        echo "Converting $img to WebP..."
        
        # Use cwebp to convert to WebP with reduced quality
        cwebp -q 80 "$img" -o "$webp_path"
        
        # Get file sizes
        original_size=$(stat -f%z "$img")
        webp_size=$(stat -f%z "$webp_path")
        
        # Calculate reduction percentage
        reduction=$((100 - (webp_size * 100 / original_size)))
        
        echo -e "${GREEN}✓ $img -> $webp_path (${reduction}% smaller)${NC}"
    fi
done

# Go back to project root
cd ../../..

echo -e "${GREEN}Image optimization completed!${NC}" 