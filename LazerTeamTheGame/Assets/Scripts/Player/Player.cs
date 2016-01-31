using System;
using System.Collections;
using System.Collections.Generic;
using UnityEngine;

namespace Assets.Scripts.Player
{
    public class Player : Character, IPlayerControls
    {
        public float moveSpeed = 150f;
        private float originalSpeed = 0f;
        public ComboPlayerControls comboControls;
        [HideInInspector] public bool isGrounded = true;

        private Rigidbody2D rigidbody;
        private Transform groundCheck;
        public bool facingRight = true;
        public Transform laser;
        public GameObject laserShot;
        public GameObject shield;
        public GameObject speedIndicator;

        private bool canShoot = true;
        private bool canRaiseShield = true;
        private bool canRunFaster = true;
        private bool canUseHelmet = true;

        private void Start()
        {
            rigidbody = GetComponent<Rigidbody2D>();
            groundCheck = transform.Find("groundCheck");
            originalSpeed = moveSpeed;
        }

        private void Update()
        {
            isGrounded = Physics2D.Linecast(transform.position, groundCheck.position, 1 << LayerMask.NameToLayer("Ground"));
        }

        public void MoveRight()
        {
            rigidbody.AddForce(Vector2.right * moveSpeed * rigidbody.mass);
            if (!facingRight) Flip();
        }

        public void MoveLeft()
        {
            rigidbody.AddForce(Vector2.left * moveSpeed * rigidbody.mass);
            if (facingRight) Flip();
        }

        public void Jump()
        {
            if (isGrounded) rigidbody.AddForce(Vector2.up * 2000f * rigidbody.mass * (comboControls.Boots ? 2f : 1f));
        }

        public void Crouch()
        {
            // shrink collision box vertically
        }

        public void Gun()
        {
            comboControls.Gun = true;
            if (!canShoot || comboControls.Shield || comboControls.Helmet) return;
            var newShot = Instantiate(laserShot);
            newShot.transform.position = laser.position;
            newShot.GetComponent<Rigidbody2D>().velocity = facingRight ? new Vector2(20f, 0f) : new Vector2(-20f, 0f);
            canShoot = false;
            StartCoroutine(DelayShot());
        }

        private IEnumerator DelayShot()
        {
            yield return new WaitForSeconds(0.3f);
            canShoot = true;
        }

        public void Shield()
        {
            if (!canRaiseShield || comboControls.Gun) return;
            shield.SetActive(true);
            comboControls.Shield = true;
            canRaiseShield = false;
            StartCoroutine(DropShield());
        }

        private IEnumerator DropShield()
        {
            yield return new WaitForSeconds(3f);
            HideShield();
            yield return new WaitForSeconds(2f);
            canRaiseShield = true;
        }

        public void HideShield()
        {
            shield.SetActive(false);
        }

        public void Boots()
        {
            if (!canRunFaster) return;
            speedIndicator.SetActive(true);
            moveSpeed *= 2f;
            comboControls.Boots = true;
            canRunFaster = false;
            StartCoroutine(restoreSpeed());
        }

        private IEnumerator restoreSpeed()
        {
            yield return new WaitForSeconds(2f);
            moveSpeed = originalSpeed;
            speedIndicator.SetActive(false);
            yield return new WaitForSeconds(2f);
            canRunFaster = true;
        }

        public void Helmet()
        {
            if (!canUseHelmet || comboControls.Gun) return;
            canUseHelmet = false;
            Time.timeScale = 0.5f;
            comboControls.Helmet = true;
            StartCoroutine(delayRestoreTime());
        }

        public void restoreTime()
        {
            Time.timeScale = 1f;
        }

        private IEnumerator delayRestoreTime()
        {
            yield return new WaitForSeconds(3f);
            restoreTime();
            yield return new WaitForSeconds(2f);
            canUseHelmet = true;
        }

        public void BootsRelease()
        {
            comboControls.Boots = false;
        }

        public void HelmetRelease()
        {
            comboControls.Helmet = false;
        }

        public void GunRelease()
        {
            comboControls.Gun = false;
        }

        public void ShieldRelease()
        {
            comboControls.Shield = false;
        }

        private void Flip()
        {
            // Switch the way the player is labelled as facing.
            facingRight = !facingRight;

            // Multiply the player's x local scale by -1.
            Vector3 theScale = transform.localScale;
            theScale.x *= -1;
            transform.localScale = theScale;
        }
    }
}
