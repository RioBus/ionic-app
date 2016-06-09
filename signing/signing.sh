# Copying the debug signing properties to Android project root
echo "Configuring Android signing properties...";
cp "$(pwd)/config/debug-signing.properties" "$(pwd)/platforms/android";
cp "$(pwd)/config/release-signing.properties" "$(pwd)/platforms/android";
cp "$(pwd)/config/debug.keystore" "$(pwd)/platforms/android";
# cp "$(pwd)/config/release.keystore" "$(pwd)/platforms/android";
echo "Finished.";