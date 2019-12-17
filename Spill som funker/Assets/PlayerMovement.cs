using UnityEngine;
using System.Collections;

public class PlayerMovement : MonoBehaviour
{
    public Rigidbody rb;
    public float sideForce = 100f;
    public float forwardForce = 2000f;
    void Start()
    {
        Physics.gravity = new Vector3(0, -30F, 0);
    }
  
    void FixedUpdate()
    {
        if(rb.velocity.magnitude < 100)
        {
            rb.AddForce(0, 0, forwardForce*Time.fixedDeltaTime);
        }
        // else
        // {
        //     rb.velocity = 100;
        // }
        if(Input.GetKey("d"))
        {
            rb.AddForce(sideForce*Time.fixedDeltaTime, 0, 0, ForceMode.VelocityChange);
        }
        if(Input.GetKey("a"))
        {
            rb.AddForce(-sideForce*Time.fixedDeltaTime, 0, 0, ForceMode.VelocityChange);
        }
    }
}

