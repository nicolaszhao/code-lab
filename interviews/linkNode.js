const node1 = {
  value: 1,
  next: {
    value: 3,
    next: {
      value: 5,
      next: null,
    },
  },
};
const node2 = {
  value: 1,
  next: {
    value: 2,
    next: {
      value: 6,
      next: null,
    },
  },
};

const node3 = {
  value: 10,
  next: {
    value: 6,
    next: {
      value: 2,
      next: null,
    },
  },
};

// 反转有序链表
function reverseLinkNode(linkNode) {
  let first = linkNode;
  let cur = first;
  let temp;

  while (cur.next) {
    // 当前的下一个存储到临时节点
    temp = cur.next;
    // 把当前的下一个指向它下一个的下一个，也就是临时节点的下一个
    cur.next = temp.next;
    // 临时节点下一个指向之前存储的第一个
    temp.next = first;
    // 临时节点变更为第一个
    first = temp;
  }

  return first;
}

// 合并 2 个有序链表
function mergeTwoLinkNode(l1, l2) {
  const head = { value: -1, next: null };
  let cur = head;

  while (l1 && l2) {
    if (l1.value <= l2.value) {
      cur.next = l1;
      l1 = l1.next;
    } else {
      cur.next = l2;
      l2 = l2.next;
    }
    // 下一个 cur 是 l1 和 l2 中较小的那个
    cur = cur.next;
  }

  // 将 l1 和 l2 中剩余的链向 head 的最后一个 
  cur.next = l1 || l2;

  return head.next;
}

console.log(
  JSON.stringify(mergeTwoLinkNode(node1, reverseLinkNode(node3)), null, 2)
);
