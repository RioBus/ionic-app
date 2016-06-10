# Copying the debug signing properties to Android project root
echo "Configuring Android signing properties...";
cp "$(pwd)/signing/debug-signing.properties" "$(pwd)/platforms/android";
cp "$(pwd)/signing/release-signing.properties" "$(pwd)/platforms/android";
cp "$(pwd)/signing/debug.keystore" "$(pwd)/platforms/android";
# cp "$(pwd)/config/release.keystore" "$(pwd)/platforms/android";
echo "Finished.";