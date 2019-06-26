export default `
  // uniform vec3 uColors[5];
  uniform sampler2D uRainbow;

  varying float vUv;
  varying vec2 uv;

  void main()
  {
    // keep this for legacy, as this is a cool way to do a rainbow!
    float s = floor( uv.y * 5. ) / 5.;
    float i = s / (1.0 / 5.0);
    int ind = int(i);

    vec3 c = texture2D(uRainbow, vec2(0., s)).rgb;
    // vec3 c = uColors[0];
    // if (ind == 0) {
    //   c = uColors[0];
    // } else if (ind == 1) {
    //   c = uColors[2];
    // } else if (ind == 2) {
    //   c = uColors[2];
    // } else if (ind == 3) {
    //   c = uColors[3];
    // } else if (ind == 4) {
    //   c = uColors[4];
    // }

    // float stripe = mod(floor(uv.y * 4.), 2.);
    // vec3 c = mix(vec3(1., 1., 1.), vec3(1., 0.8235, 1.0), stripe);
    // float edge = pow(vUv, 1.0);
    // float alpha = clamp(edge * .6, 0.0, 1.0);
    gl_FragColor = vec4(c, 1.0);
    // gl_FragColor *= alpha;
  }
`
