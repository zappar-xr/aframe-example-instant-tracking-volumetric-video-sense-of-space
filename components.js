// Create a plane material which will receive the shadows.
AFRAME.registerComponent('shadow-material', {
    init: function(){
        let mesh = this.el.getObject3D('mesh');
        if (!mesh){return;}
        mesh.material = new THREE.ShadowMaterial();
        mesh.material.opacity = 0.2;
    }
});
AFRAME.registerComponent('shadow-opts', {
    init: function(){
        // Configure some pretty shadows.
        let light = this.el.getObject3D('light');
        if (!light){return;}
        light.lookAt(0, 0, 0);
        light.castShadow = true;
        light.shadow.bias = 0.001;
        const shadowDistance = 8;
        light.shadow.camera.top = shadowDistance;
        light.shadow.camera.bottom = -shadowDistance;
        light.shadow.camera.left = -shadowDistance;
        light.shadow.camera.right = shadowDistance;

        light.shadow.camera.near = 0.1;
        light.shadow.camera.far = 50;
        light.shadow.radius = 2;
        light.shadow.mapSize.width = 1024;
        light.shadow.mapSize.height = 1024;
    }
});