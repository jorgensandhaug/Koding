using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class Player : MonoBehaviour{
    public float speed = 5f;
    public float smoothMoveTime = .1f;
    public float turnSpeed = 8;
    float angle = 0;
    float smoothMag = 0;
    float smoothMoveVel = 0;
    // Start is called before the first frame update
    void Start(){
        
    }

    // Update is called once per frame
    void Update(){
        Vector3 dir = new Vector3(Input.GetAxisRaw("Horizontal"), 0, Input.GetAxisRaw("Vertical")).normalized;
        smoothMag = Mathf.SmoothDamp(smoothMag, dir.magnitude, ref smoothMoveVel, smoothMoveTime);
        float targetAngle = Mathf.Atan2(dir.x, dir.z) * Mathf.Rad2Deg;
        angle = Mathf.LerpAngle(angle, targetAngle, Time.deltaTime * turnSpeed * dir.magnitude);
        transform.eulerAngles = Vector3.up * angle;
        transform.Translate(transform.forward * speed * smoothMag * Time.deltaTime, Space.World);
    }
}
