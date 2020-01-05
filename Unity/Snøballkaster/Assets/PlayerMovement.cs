using System.Collections;
using System.Collections.Generic;
using UnityEngine;

public class PlayerMovement : MonoBehaviour
{
    public Transform playerBody;

    void Start()
    {
        
    }

    void Update()
    {
        if(Input.GetKey("w"))
        {
            Debug.Log(playerBody.position.x);
        }
    }
}
