#!/bin/bash
for file in src/screens/*.jsx; do
  screen_name=$(basename "$file" .jsx)
  
  # Add the import at the top
  perl -pi -e "s|import (.*) from \"react\";|import \1 from \"react\";\nimport { DesignStatusBanner } from \"../components/DesignStatusBanner\";|" "$file"
  
  # Find the first <div> returning in the component and add the banner after it
  # We look for `<div style={{ width: "100%",` which is the root div pattern for all screens
  perl -pi -e "s|(<div style=\{\{ width: \"100%\",[^\n]*>)|\\1\n      <DesignStatusBanner screenName=\"$screen_name\" />|" "$file"
done
