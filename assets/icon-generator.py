#!/usr/bin/env python3
"""
Simple script to generate TodoList app icons in different sizes
Requires Pillow: pip install Pillow
"""

from PIL import Image, ImageDraw, ImageFont
import os

def create_todolist_icon(size, output_path):
    # Create a new image with a modern gradient background
    img = Image.new('RGBA', (size, size), (255, 255, 255, 0))
    draw = ImageDraw.Draw(img)
    
    # Modern gradient background (light blue to blue)
    for i in range(size):
        alpha = i / size
        r = int(65 + (33 - 65) * alpha)   # 65 -> 33
        g = int(105 + (150 - 105) * alpha) # 105 -> 150  
        b = int(225 + (243 - 225) * alpha) # 225 -> 243
        draw.rectangle([0, i, size, i+1], fill=(r, g, b, 255))
    
    # Draw rounded rectangle background
    margin = size // 10
    corner_radius = size // 8
    
    # Main background (white with slight transparency)
    draw.rounded_rectangle(
        [margin, margin, size-margin, size-margin], 
        corner_radius, 
        fill=(255, 255, 255, 240)
    )
    
    # Draw checklist items
    item_height = size // 8
    item_margin = size // 5
    checkbox_size = size // 12
    
    for i in range(3):
        y = item_margin + (i * item_height)
        
        # Checkbox
        checkbox_x = item_margin
        checkbox_y = y + (item_height - checkbox_size) // 2
        
        if i == 0:  # First item checked
            # Filled checkbox with checkmark
            draw.rounded_rectangle(
                [checkbox_x, checkbox_y, checkbox_x + checkbox_size, checkbox_y + checkbox_size],
                checkbox_size // 4,
                fill=(34, 197, 94, 255)  # Green
            )
            # Checkmark
            check_points = [
                (checkbox_x + checkbox_size // 4, checkbox_y + checkbox_size // 2),
                (checkbox_x + checkbox_size // 2, checkbox_y + checkbox_size * 3 // 4),
                (checkbox_x + checkbox_size * 3 // 4, checkbox_y + checkbox_size // 4)
            ]
            draw.line(check_points[:2], fill=(255, 255, 255, 255), width=max(1, checkbox_size // 8))
            draw.line(check_points[1:], fill=(255, 255, 255, 255), width=max(1, checkbox_size // 8))
        else:
            # Empty checkbox
            draw.rounded_rectangle(
                [checkbox_x, checkbox_y, checkbox_x + checkbox_size, checkbox_y + checkbox_size],
                checkbox_size // 4,
                outline=(156, 163, 175, 255),  # Gray
                width=max(1, checkbox_size // 10)
            )
        
        # Task line
        line_x = checkbox_x + checkbox_size + checkbox_size // 2
        line_y = y + item_height // 2
        line_width = size - item_margin - line_x
        line_height = max(1, size // 60)
        
        color = (156, 163, 175, 255) if i == 0 else (75, 85, 99, 255)  # Gray for completed, dark for others
        draw.rectangle([line_x, line_y, line_x + line_width, line_y + line_height], fill=color)
        
        # Strike-through for completed item
        if i == 0:
            draw.rectangle([line_x, line_y, line_x + line_width, line_y + line_height], fill=(156, 163, 175, 255))
    
    # Add a subtle shadow/border
    shadow_img = Image.new('RGBA', (size + 4, size + 4), (0, 0, 0, 0))
    shadow_draw = ImageDraw.Draw(shadow_img)
    shadow_draw.rounded_rectangle([2, 2, size + 2, size + 2], corner_radius, fill=(0, 0, 0, 30))
    
    # Composite shadow with main image
    final_img = Image.new('RGBA', (size + 4, size + 4), (255, 255, 255, 0))
    final_img.paste(shadow_img, (0, 0))
    final_img.paste(img, (2, 2))
    
    # Crop back to original size
    final_img = final_img.crop((2, 2, size + 2, size + 2))
    
    return final_img

def generate_android_icons():
    """Generate Android app icons in required sizes"""
    
    # Android icon sizes
    sizes = {
        'mipmap-mdpi': 48,
        'mipmap-hdpi': 72,
        'mipmap-xhdpi': 96,
        'mipmap-xxhdpi': 144,
        'mipmap-xxxhdpi': 192,
    }
    
    # Create directories
    android_res_dir = '../android/app/src/main/res'
    
    for folder, size in sizes.items():
        folder_path = os.path.join(android_res_dir, folder)
        os.makedirs(folder_path, exist_ok=True)
        
        # Generate regular icon
        icon = create_todolist_icon(size, f'{folder_path}/ic_launcher.png')
        icon.save(f'{folder_path}/ic_launcher.png', 'PNG')
        
        # Generate round icon (same design)
        round_icon = create_todolist_icon(size, f'{folder_path}/ic_launcher_round.png')
        round_icon.save(f'{folder_path}/ic_launcher_round.png', 'PNG')
        
        print(f'Generated {folder}/ic_launcher.png ({size}x{size})')
        print(f'Generated {folder}/ic_launcher_round.png ({size}x{size})')

if __name__ == '__main__':
    generate_android_icons()
    print('\n✅ All Android app icons generated successfully!')
    print('Icons saved to android/app/src/main/res/mipmap-* folders')
