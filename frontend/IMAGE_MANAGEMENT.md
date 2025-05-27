# Image Management for VELOCITY OFFROAD Website

This document provides comprehensive guidelines for managing images for the VELOCITY OFFROAD website using the static JSON approach.

## Directory Structure

Images are stored in the `public/images/` directory of the frontend project, organized by category:

```
public/
  ├── images/
  │   ├── team/            # Team member photos
  │   ├── projects/        # Car and project images
  │   ├── events/          # Event photos
  │   ├── sponsors/        # Sponsor logos
  │   ├── gallery/         # Gallery images
  │   ├── merchandise/     # Product images
  │   ├── hero/            # Hero section backgrounds
  │   ├── achievements/    # Awards and trophies
  │   └── logo/            # Website logos and branding
  └── videos/              # Video files
```

## Image Naming and Format Guidelines

### Naming Conventions
- Use lowercase letters
- Use hyphens instead of spaces (`team-photo.jpg` not `team photo.jpg`)
- Use descriptive names
- Include year when relevant (`car-2025.jpg`)

### Recommended Formats
- **PNG**: For logos, icons, and images requiring transparency
- **SVG**: For logos, icons, and illustrations that need to scale
- **JPG/JPEG**: For photographs and complex images
- **WebP**: For optimized web images (provide JPG/PNG fallbacks)

### Image Sizing Guidelines
- **Team member photos**: 600x600 pixels (1:1 square ratio)
- **Project/car images**: 1200x800 pixels (3:2 ratio)
- **Hero section images**: 1920x1080 pixels (16:9 ratio)
- **Gallery images**: 1200x800 pixels
- **Merchandise images**: 800x800 pixels (1:1 square ratio)
- **Sponsor logos**: Maintain aspect ratio, max width 400px

## Adding or Updating Images

1. **Prepare and optimize the image**
   - Compress images using tools like [TinyPNG](https://tinypng.com/) or [Squoosh](https://squoosh.app/)
   - Resize to recommended dimensions
   - Save in the appropriate format

2. **Upload the image to the appropriate directory**
   - Place in the correct category folder (team, projects, etc.)
   - Use descriptive filenames following the naming conventions

3. **Update the corresponding JSON file**
   - Open the appropriate JSON file in `src/data/`
   - Update the `image_url` field with the correct path
   - Example: `/images/team/john-doe.jpg`
   - Make sure the path starts with `/images/`

## Example: Adding a New Team Member with Photo

1. Prepare the team member's photo:
   - Crop to a square (1:1) aspect ratio
   - Resize to 600x600 pixels
   - Optimize/compress the image
   - Save as JPG or PNG format

2. Add the photo to `public/images/team/` (e.g., `jane-smith.jpg`)

3. Update `src/data/members.json`:
   ```json
   {
     "id": "5",
     "name": "Jane Smith",
     "role": "Electronics Engineer",
     "bio": "Jane specializes in electronic systems for our racing cars.",
     "image_url": "/images/team/jane-smith.jpg",
     "social_links": {
       "linkedin": "https://linkedin.com/in/janesmith",
       "github": "https://github.com/janesmith"
     }
   }
   ```

## Common Image Issues and Solutions

### Issue: Images Not Displaying
- Check that the file exists in the correct location
- Verify the path in the JSON file starts with `/images/`
- Ensure the filename case matches exactly (URLs are case-sensitive)
- Confirm the image format is web-compatible

### Issue: Slow Loading Images
- Compress images further
- Ensure images are not larger than needed
- Consider using WebP format with fallbacks
- Implement lazy loading for images below the fold

### Issue: Inconsistent Team Photos
- Use consistent lighting and background
- Crop all photos to the same aspect ratio
- Apply similar color treatment to all photos
- Position faces similarly in each frame

## Example: Updating an Existing Image

1. Prepare the new version of the image following the same guidelines
2. Options for updating:
   - **Same filename**: Simply replace the file in the appropriate directory, keeping the same filename
   - **New filename**: Add the new image with a different filename and update the JSON file with the new path

## Best Practices for Project Images

1. **Consistent Photography**
   - Use similar lighting, angles, and background for all car/project photos
   - Photograph cars on a clean, simple background
   - Capture multiple angles (front, side, rear, interior)

2. **Gallery Images**
   - Include both action shots and detailed close-ups
   - Capture team members working on vehicles
   - Document the build process with progression photos

3. **Sponsor Logos**
   - Request vector versions (SVG) from sponsors when possible
   - Ensure all logos have transparent backgrounds
   - Maintain consistent sizing across similar tier sponsors

## Video Management

Videos should be stored in the `public/videos/` directory and referenced in JSON files similar to images.

Guidelines for videos:
- Use compressed formats (MP4 with H.264 encoding)
- Keep file sizes under 10MB when possible
- Consider hosting larger videos on YouTube/Vimeo and embedding them
- Include poster images for videos

Example JSON entry:
```json
{
  "id": "video1",
  "title": "2025 Race Highlights",
  "description": "Highlights from our championship race",
  "video_url": "/videos/race-highlights-2025.mp4",
  "poster_image": "/images/gallery/race-poster.jpg",
  "duration": "1:45"
}
```

## Deployment Considerations

This static approach to image management means that whenever you update images, you'll need to:

1. Add/replace the image files in the public directory
2. Update the JSON data if needed
3. Rebuild and redeploy the application

For a development workflow:
- Make image changes locally first
- Test thoroughly in development environment
- Commit changes to version control
- Deploy to your hosting provider

---

By following these guidelines, you'll maintain consistent, high-quality images throughout the VELOCITY OFFROAD website.