using System.Collections;
using System.Collections.Generic;
using UnityEngine;
using System;

public class Player : MonoBehaviour{
    public float speed = 7;
    float velocity;
    float halfWidth;
    public event System.Action OnPlayerDeath;


    // Start is called before the first frame update
    void Start(){
        halfWidth = Camera.main.aspect * Camera.main.orthographicSize;
    }

    // Update is called once per frame
    void Update(){
        velocity = Input.GetAxisRaw("Horizontal") * speed;
    }

    void FixedUpdate(){
        if(transform.position.x < -(halfWidth + transform.localScale.x/2)){
            transform.position = new Vector2((halfWidth + transform.localScale.x/2), transform.position.y);
        }
        else if(transform.position.x > (halfWidth + transform.localScale.x/2)){
            transform.position = new Vector2(-(halfWidth + transform.localScale.x/2), transform.position.y);
        }
        transform.Translate(Vector2.right * velocity * Time.fixedDeltaTime);
    }
    
    void OnTriggerEnter2D(Collider2D triggerCollider){
        if(triggerCollider.tag == "FallingBlock"){
            if(OnPlayerDeath != null){
                OnPlayerDeath();
            }
            Destroy(gameObject);
        }
    }
}
