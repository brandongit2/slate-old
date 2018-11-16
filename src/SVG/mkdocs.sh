package='jsdoc'
if [ `npm list -g | grep -c $package` -eq 0 ]; then
    echo -e "\033[0;31mJSDoc is not installed.\033[0m Install by running \033[1;33mnpm i -g jsdoc.";
    exit 1;
fi
echo "Generating documentation..."
jsdoc ./src -r -d ./doc
echo -e "\033[0;32mDone!"
