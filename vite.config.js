import { resolve } from 'path'
import { defineConfig } from 'vite'


export default defineConfig({
    build:{
        rollupOptions:{
            input:{
                main: resolve(__dirname, "index.html"),
                animation:resolve(__dirname, "animation.html"),
                apis:resolve(__dirname, "apis.html"),
                arduino:resolve(__dirname, "arduino.html"),
                ball:resolve(__dirname, "ball.html"),
                boid:resolve(__dirname, "boid.html"),
                brownian_motion:resolve(__dirname, "brownian_motion.html"),
                camera:resolve(__dirname, "camera.html"),
                canvas:resolve(__dirname, "canvas.html"),
                classes:resolve(__dirname, "classes.html"),
                collisions:resolve(__dirname, "collisions.html"),
                datatypes:resolve(__dirname, "datatypes.html"),
                firebase:resolve(__dirname, "firebase.html"),
                genetic_algorithm:resolve(__dirname, "genetic_algorithm.html"),
                gravity:resolve(__dirname, "gravity.html"),
                image_classifier:resolve(__dirname, "image_classifier.html"),
                infection_simulator:resolve(__dirname, "infection_simulator.html"),
                pixel_art:resolve(__dirname, "pixel_art.html"),
                programming:resolve(__dirname, "programming.html"),
                resources:resolve(__dirname, "resources.html"),
                rope:resolve(__dirname, "rope.html"),
                seeking_behavior:resolve(__dirname, "seeking_behavior.html"),
                sorting:resolve(__dirname, "sorting.html"),
                vector:resolve(__dirname, "vector.html"),
                vector_fields:resolve(__dirname, "vector_fields.html"),
                video_game:resolve(__dirname, "video_game.html"),
                web_development:resolve(__dirname, "web_development.html"),
                webcam:resolve(__dirname, "webcam.html"),
                neural_network:resolve(__dirname, "neural_network.html"),
                
            }
        }
    }
})