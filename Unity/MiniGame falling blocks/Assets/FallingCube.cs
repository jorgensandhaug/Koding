using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class FallingCube : MonoBehaviour{
    public Vector2 speedMaxMin = new Vector2(0.1f, 0.3f);
    float heightThresh;
    // Start is called before the first frame update
    void Start(){
        heightThresh = -Camera.main.orthographicSize - transform.localScale.y;
    }

    void FixedUpdate(){
        float fallSpeed = Mathf.Lerp(speedMaxMin.x, speedMaxMin.y, Difficulty.GetPercent());
        transform.Translate(Vector2.down*fallSpeed);
        if(transform.position.y < heightThresh){
            Destroy(gameObject);
        }
    }
}
