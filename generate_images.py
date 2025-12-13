#!/usr/bin/env python3
"""
Generate og-image.png and favicon.ico for Bene Fundraising
"""
try:
    from PIL import Image, ImageDraw, ImageFont
    import os
    
    # Create og-image.png (1200x630)
    og_image = Image.new('RGB', (1200, 630), color='#1e293b')  # slate-900 background
    draw = ImageDraw.Draw(og_image)
    
    # Draw a simple design with text
    # Title
    try:
        # Try to use a system font
        font_large = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 72)
        font_medium = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf", 48)
    except:
        # Fallback to default font
        font_large = ImageFont.load_default()
        font_medium = ImageFont.load_default()
    
    # Draw title
    title = "Bene Fundraising"
    subtitle = "Create & fund campaigns on-chain"
    
    # Get text dimensions
    bbox = draw.textbbox((0, 0), title, font=font_large)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]
    
    # Center the text
    x = (1200 - text_width) // 2
    y = (630 - text_height) // 2 - 50
    
    # Draw title
    draw.text((x, y), title, fill='#ffffff', font=font_large)
    
    # Draw subtitle
    bbox_sub = draw.textbbox((0, 0), subtitle, font=font_medium)
    text_width_sub = bbox_sub[2] - bbox_sub[0]
    x_sub = (1200 - text_width_sub) // 2
    y_sub = y + text_height + 20
    
    draw.text((x_sub, y_sub), subtitle, fill='#a855f7', font=font_medium)  # purple accent
    
    # Save og-image.png
    og_image.save('public/og-image.png', 'PNG')
    print("Created public/og-image.png")
    
    # Create favicon.ico (32x32)
    favicon = Image.new('RGB', (32, 32), color='#7b3fe4')  # purple background
    draw_fav = ImageDraw.Draw(favicon)
    
    # Draw a simple "B" for Bene
    try:
        font_fav = ImageFont.truetype("/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf", 24)
    except:
        font_fav = ImageFont.load_default()
    
    bbox_fav = draw_fav.textbbox((0, 0), "B", font=font_fav)
    text_width_fav = bbox_fav[2] - bbox_fav[0]
    text_height_fav = bbox_fav[3] - bbox_fav[1]
    x_fav = (32 - text_width_fav) // 2
    y_fav = (32 - text_height_fav) // 2
    
    draw_fav.text((x_fav, y_fav), "B", fill='#ffffff', font=font_fav)
    
    # Save favicon.ico
    favicon.save('public/favicon.ico', 'ICO')
    print("Created public/favicon.ico")
    
except ImportError:
    print("PIL (Pillow) not available. Installing...")
    import subprocess
    import sys
    subprocess.check_call([sys.executable, "-m", "pip", "install", "Pillow"])
    # Re-run the script
    exec(open(__file__).read())

