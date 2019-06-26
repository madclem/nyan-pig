export default `
attribute float aUv;
attribute vec2 position;
attribute float direction;
attribute float dist;
attribute vec2 next;
attribute vec2 prev;

varying float vUv;
varying vec2 uv;
varying vec2 uv2;
varying vec2 normals;
varying float vThickness;

uniform sampler2D target;

uniform mat3 translationMatrix;
uniform mat3 projectionMatrix;
uniform float time;
uniform float thickness;

void main()
{
    vUv = aUv;
    vec2 nextScreen = next; /// nexP.w * aspectVec;
    vec2 posScreen = position; /// posP.w * aspectVec;
    vec2 prevScreen = prev;

    vec2 dir;

    if (posScreen == prevScreen)
    {
    dir = normalize(nextScreen - posScreen);
  }
  else if (posScreen == nextScreen)
  {
    dir = normalize(posScreen - prevScreen);
  }
  else
  {
    //get directions from (C - B) and (B - A)
    vec2 dirA = normalize((posScreen - prevScreen));
    vec2 dirB = normalize((nextScreen - posScreen));
    dir = normalize(dirA + dirB);
  }

  vec2 normal = vec2(-dir.y, dir.x);

  normals = normal;

  posScreen += normal * direction * thickness;// * 10.;

  float d = sign(direction) ;// + 0.5;
  d += 1.;
  d *= 0.5;

  uv = vec2(dist, d );//*0.5) )+0.5);//(1./direction/2.) + 0.5);
  uv.x /= 2.;
  uv2 /= 2.;
  uv2.x += 0.5;
  uv2 = posScreen/vec2(1680., 464.);

  vThickness = abs(direction * thickness);


  gl_Position = vec4((projectionMatrix * translationMatrix * vec3(posScreen, 1.0)).xy, 0.0, 1.0);
}
`
