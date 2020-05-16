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
    
    ofShader eDetector, gaussian;
    glm::vec2 size;
    ofFbo f;

    void setup(){
        gaussian.load("../../../../../addons/ofxEdgeCannyDetector/src/Shaders/gaussian");
        eDetector.load("../../../../../addons/ofxEdgeCannyDetector/src/Shaders/sobel");
        
        size = glm::vec2(ofGetWidth(), ofGetHeight());
        f.allocate(size.x, size.y);
    }

    void begin(){
        f.begin();
        ofClear(0);
        gaussian.begin();
    }

    void end(){
        gaussian.end();
        f.end();
        eDetector.begin();
        eDetector.setUniform2f("u_resImg", size);
        f.draw(0,0);
        eDetector.end();
    }

    
};
#endif /* ofxEdgeCannyDetector_hpp */
