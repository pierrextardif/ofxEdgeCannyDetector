#version 120
#extension GL_ARB_texture_rectangle : enable

// implementation sources :
// http://www.pages.drexel.edu/~nk752/Research/cannyTut2.html
// https://towardsdatascience.com/canny-edge-detection-step-by-step-in-python-computer-vision-b49c3a2d8123
// https://docs.opencv.org/2.4/doc/tutorials/imgproc/imgtrans/canny_detector/canny_detector.html


#define PI      3.14159265358979323
#define PI_2    1.57079632679
#define PI_4    0.78539816339
#define PI_8    0.39269908169


#define PI_7_8  2.7488936
#define PI_3_8  1.178097
#define PI_5_8  1.9634954


uniform sampler2DRect       u_tex_unit0;
uniform vec2                u_resImg;

uniform float               u_strength;

float highThreshold = .35;
float lowThreshold = .1;


// ==== Gaussian filtering ==== //
const int kernelSize = 5;
float gaussianKernel[kernelSize * kernelSize] = float[]( 2.,   4.,  5.,  4.,  2.,
                                                         4.,   9., 12.,  9.,  4.,
                                                         5.,  12., 15., 12.,  5.,
                                                         2.,   4.,  5.,  4.,  2.,
                                                         4.,   9., 12.,  9.,  4.);

vec4 Gaussian(sampler2DRect tex, vec2 uv){
    
    uv -= vec2(2);
    
    vec4 col;
    int i = 0;
    for(i=0; i < gaussianKernel.length(); i += 1){
        
        vec2 offset = vec2(mod(float(i),5.) - 2., floor(float(i) / 5.) - 2.);
        col += texture2DRect(tex, uv + offset) * gaussianKernel[i];
    }
    
    col /= 159.;
    
    return col;
}

// ==== Gaussian filtering ==== //


float GREYCol(vec3 rgb){
    return .3086 * rgb.r + .6094 * rgb.g + 0.0820 * rgb.b;
    
}

float GREYTex(sampler2DRect tex, vec2 uv){
//    vec3 rgb = Gaussian(tex, uv).rgb;
    vec3 rgb = texture2DRect(tex, uv).rgb;
    return GREYCol(rgb);
    
}

vec2  offsetTheta(float val){
    
    vec2 dir = vec2(0.);
    if(val == 0.)dir = vec2(0., 1.);
    if(val == 1.)dir = vec2(1., 0.);
    if(val == 2.)dir = vec2(1., -1.);
    if(val == 3.)dir = vec2(1., 1.);
    
    return dir;
}

vec2 convertAngle(float theta){
    
    vec2 offset = vec2(0.);
    // direction vertical neighboor
    if( ( theta > PI_3_8 && theta < PI_2 ) || (theta > -PI_2 && theta < - PI_3_8) )offset = vec2(0., 1.);
//    // direction horizontal neighboor
    if( ( theta > -PI_8 && theta < PI_8 ) )offset = vec2(1., 0.);
    //first diagonal //
    if( theta > PI_8 && theta < PI_3_8 )offset = vec2(1., -1.);
    //second diagonal \\
    if( theta > -PI_3_8 && theta < -PI_8 )offset = vec2(1., 1.);
    
    return offset;
}


mat3 Gx = mat3( -1.0, 0.0, 1.0,
                -2.0, 0.0, 2.0,
                -1.0, 0.0, 1.0 );

mat3 Gy =  mat3( 1.0,  2.0,  1.0,
                 0.0,  0.0,  0.0,
                -1.0, -2.0, -1.0 );

float Sobel(sampler2DRect tex, vec2 uv){

    float col = 0.;
    vec2 thetaOffsetDir = vec2(0.);
    float strength = 0.;
    if(uv.x>0.&&uv.x<u_resImg.x&&uv.y>0.&&uv.y<u_resImg.y){
        
        int i,j;
        float colX = 0.;
        float colY = 0.;
        for(i = -1; i <=1; i++){
            for(j = -1; j <=1; j++){
                colX += GREYTex(tex, uv + vec2(i,j)) * (Gx[i+1][j+1]);
                colY += GREYTex(tex, uv + vec2(i,j)) * (Gy[i+1][j+1]);
            }
        }
        
        strength = pow(colX * colX + colY * colY, (.5));
        thetaOffsetDir = convertAngle(atan(colY / colX));
    }
    
    
    if(strength >= highThreshold)col = 1.0;
    if(strength < lowThreshold){
        col = 0.;
    }
    
    if((strength >= lowThreshold && strength < highThreshold) || (col == 1.) ){
        bool isNeighBoorStrong = false;

        float neighboorStrength = 0.;
        int k = -1;
        for(k = -1; k <=1; k += 2){
            vec2 uvNeighboor = uv + thetaOffsetDir * k;
            
            int i,j;
            float colX = 0.;
            float colY = 0.;
            for(i = -1; i <=1; i++){
                for(j = -1; j <=1; j++){
                    colX += GREYTex(tex, uvNeighboor + vec2(i,j)) * (Gx[i+1][j+1]);
                    colY += GREYTex(tex, uvNeighboor + vec2(i,j)) * (Gy[i+1][j+1]);
                }
            }
            
            neighboorStrength = pow(colX * colX + colY * colY, .5);
            if(neighboorStrength > highThreshold)isNeighBoorStrong=true;
            
        }
        
        if( (isNeighBoorStrong || col == 1.) && neighboorStrength < strength ){
            col = 1.0;
        }else{
            col = 0.;
        }
        
    }
    
    return col;
}

void main( void )
{
    
    vec2 uv_Norm = vec2(gl_TexCoord[0].st / u_resImg);
    gl_FragColor = vec4(vec3(Sobel(u_tex_unit0, gl_TexCoord[0].st)), 1.0);
    
}

