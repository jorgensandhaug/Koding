using UnityEngine;
using System.Collections;

public class PlayerCollision : MonoBehaviour
{
    public PlayerMovement movement;
    public TimeManager timeManager;

    // Update is called once per frame
    void OnCollisionEnter (UnityEngine.Collision collision)
    {
        if(collision.collider.tag == "Obstacle")
        {
            // movement.enabled = false;
            timeManager.SlowDown();
        }
    }
}

