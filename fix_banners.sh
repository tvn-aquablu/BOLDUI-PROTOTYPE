#!/bin/bash
for file in src/screens/*.jsx; do
  screen_name=$(basename "$file" .jsx)
  
  # Remove the existing banner injection if it's there to avoid duplicates
  perl -pi -e "s/[ \t]*<DesignStatusBanner.*//g" "$file"
  
  # Inject it after the first return statement's parent div
  perl -pi -e "s|(return \(\n[ \t]*<div[^>]*>)|\\1\n      <DesignStatusBanner screenName=\"$screen_name\" />|" "$file"
done
