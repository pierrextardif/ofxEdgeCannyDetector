//
//  ofxEdgeCannyDetector.hpp
//  example
//
//  Created by Pierre Tardif on 15/05/2020.
//


#ifndef ofxEdgeCannyDetector_hpp
#define ofxEdgeCannyDetector_hpp

#include <stdio.h>
#include "ofMain.h"

class ofxEdgeCannyDetector{
    
    public :

    ofxEdgeCannyDetector(){
        
    }
    
    ofShader eDetector;
    glm::vec2 size;

    void setup(){
        eDetector.load("../../../../../addons/ofxEdgeCannyDetector/src/Shaders/sobel");
        size = glm::vec2(ofGetWidth(), ofGetHeight());
    }

    void begin(){
        eDetector.begin();
        eDetector.setUniform2f("u_resImg", size);
    }

    void end(){
        eDetector.end();
    }

    
};
#endif /* ofxEdgeCannyDetector_hpp */
