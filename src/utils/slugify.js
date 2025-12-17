import slugifyLib from 'slugify';

export function createSlug(text) {
  return slugifyLib(text, {
    lower: true,
    strict: true,
    trim: true
  });
}

export function createUniqueSlug(baseSlug, existingSlugs = []) {
  let slug = baseSlug;
  let counter = 1;
  
 while (existingSlugs.includes(slug)) {
  slug = `${baseSlug}-${counter}`;
  counter++;
}
  
  return slug;
}