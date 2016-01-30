using System;
using UnityEngine;

namespace Assets.Scripts.Player
{
    public class Player : MonoBehaviour, IPlayerControls
    {
        public bool MoveRight()
        {
            Debug.Log("Move Right");
            return true;
        }

        public bool MoveLeft()
        {
            Debug.Log("Move Left");
            return true;
        }

        public bool Jump()
        {
            Debug.Log("Jump");
            return true;
        }

        public bool Crouch()
        {
            Debug.Log("Crouch");
            return true;
        }

        public bool Gun()
        {
            Debug.Log("Gun");
            return true;
        }

        public bool Shield()
        {
            Debug.Log("Shield");
            return true;
        }

        public bool Boots()
        {
            Debug.Log("Boots");
            return true;
        }

        public bool Helmet()
        {
            Debug.Log("Helmet");
            return true;
        }
    }
}
