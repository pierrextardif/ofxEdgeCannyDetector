# ofxEdgeCannyDetector
Simple OpenFrameworks edge detection algorithm based on Edge Canny Detection.
</br>
ref : </br>
http://www.pages.drexel.edu/~nk752/Research/cannyTut2.html
https://towardsdatascience.com/canny-edge-detection-step-by-step-in-python-computer-vision-b49c3a2d8123
https://docs.opencv.org/2.4/doc/tutorials/imgproc/imgtrans/canny_detector/canny_detector.html
</br>
</br>

- - - -

![.](assets/1.png)

- - - -
## Getting Started

### Installs

### 1)Installing OpenFrameworks

Get the latest OpenFrameworks version from [here](https://openframeworks.cc/download)(linux armV6), and follow [this tutorial](https://openframeworks.cc/setup/xcode/) to get set up with the openframeworks on Mac OS.
</br>
Make sure you can run some of the examples before proceeding any further (for example : OF_Install_Directory/examples/3DPrimitivesExample/).

### 2) Installing the Addon

</br>
Drop the ofxEdgeCannyDetector in your addons folder.
</br>

## Example

Just try running [the example](./exampleEdgeCannyDetector) : import it with the Project Generator, to link it, and run it in Xcode.

## Author

* _pierre Tardif_   [codingcoolsh.it](codingcoolsh.it)   :floppy_disk:

## License

This project is licensed under the MIT License - see the [LICENSE.md](./LICENSE) file for details.


## Acknowledgments

* [ofxCV](https://github.com/kylemcdonald/ofxCv/tree/master/example-edge) already uses it, but I wanted to have my own version of it, which I could use in shaders - no extra buffer / library - .
