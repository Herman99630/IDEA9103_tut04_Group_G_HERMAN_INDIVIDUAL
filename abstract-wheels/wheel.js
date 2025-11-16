// Herman – Individual version adds mouse-magnet interaction.
// All group visual behaviour is preserved exactly.

class Wheel {
  constructor(x, y, baseRadius, palette) {
    // group original positions
    this.baseX = x;
    this.baseY = y;

    // current animated position
    this.x = x;
    this.y = y;

    this.baseRadius = baseRadius;
    this.palette = palette;
    this.rings = [];

    // rotation
    this.rotation = random(TWO_PI);
    this.baseRotationSpeed = random(-0.01, 0.01);
    this.rotationSpeed = this.baseRotationSpeed;

    // Herman: individual state
    this.isFrozen = false;
  }

  initRings() {
    let numRings = floor(random(3, 6));
    let step = this.baseRadius / numRings;
    let currentInner = 0;

    for (let i = 0; i < numRings; i++) {
      let innerR = currentInner;
      let outerR = currentInner + step;
      currentInner = outerR;

      let rnd = random();
      let type = rnd < 0.33 ? "solid" : rnd < 0.66 ? "dots" : "rays";

      let mainColor = random(this.palette);
      let secondaryColor = random(this.palette);

      this.rings.push(
        new Ring(innerR, outerR, type, mainColor, secondaryColor)
      );
    }
  }

  update() {
    // ----------------------
    // Herman – Interaction
    // ----------------------
    if (!magnetEnabled || this.isFrozen) {
      // smoothly return to original layout position
      this.x += (this.baseX - this.x) * 0.05;
      this.y += (this.baseY - this.y) * 0.05;

      // return rotation speed to base
      this.rotationSpeed += (this.baseRotationSpeed - this.rotationSpeed) * 0.1;
    } else {
      // mouse "magnet" mode
      let d = dist(mouseX, mouseY, this.baseX, this.baseY);
      let influenceRadius = this.baseRadius * 4;

      if (d < influenceRadius) {
        let strength = 1 - d / influenceRadius;

        this.x += (mouseX - this.x) * 0.08 * strength;
        this.y += (mouseY - this.y) * 0.08 * strength;

        this.rotationSpeed = this.baseRotationSpeed * (1 + 2 * strength);
      } else {
        this.x += (this.baseX - this.x) * 0.05;
        this.y += (this.baseY - this.y) * 0.05;
        this.rotationSpeed += (this.baseRotationSpeed - this.rotationSpeed) * 0.1;
      }
    }

    // group original behaviour
    this.rotation += this.rotationSpeed;
    for (let r of this.rings) r.update();
  }

  display() {
    push();
    translate(this.x, this.y);
    rotate(this.rotation);

    noStroke();
    fill(0, 35);
    ellipse(0, 0, this.baseRadius * 3.2, this.baseRadius * 3.2);

    fill(0, 55);
    ellipse(0, 0, this.baseRadius * 2.6, this.baseRadius * 2.6);

    fill(0, 80);
    ellipse(4, 6, this.baseRadius * 2.1, this.baseRadius * 2.1);

    // group: core circle
    noStroke();
    fill(this.palette[0]);
    ellipse(0, 0, this.baseRadius * 0.6, this.baseRadius * 0.6);

    // group: all rings
    for (let r of this.rings) r.display();

    // group: dashed outline
    noFill();
    stroke(255, 45);
    strokeWeight(1.2);
    drawingContext.setLineDash([6, 6]);
    ellipse(0, 0, this.baseRadius * 2.0, this.baseRadius * 2.0);
    drawingContext.setLineDash([]);

    // Herman: highlight frozen wheel
    if (this.isFrozen) {
      noFill();
      stroke(255, 180);
      strokeWeight(2);
      ellipse(0, 0, this.baseRadius * 2.3, this.baseRadius * 2.3);
    }

    pop();
  }
}

