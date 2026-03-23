// useScrollDetection.js - 修正版
import { ref, onMounted, onUnmounted, onUpdated } from 'vue';

export function useScrollDetection(threshold = 80, elementRef) {
  const isScrolled = ref(false);
  
  const handleScroll = () => {
    // 关键修正：通过.value访问DOM元素
    if (!elementRef || !elementRef.value) {
      console.warn('useScrollDetection: elementRef is null or undefined');
      return;
    }
    
    // 访问DOM元素的scrollTop属性
    const scrollPosition = elementRef.value.scrollTop || 0;
    isScrolled.value = scrollPosition > threshold;
  };
  
  onMounted(() => {
    // 防御性检查
    if (!elementRef || !elementRef.value) {
      console.warn('useScrollDetection: elementRef not available on mounted');
      return;
    }
    
    // 在DOM元素上添加事件监听器
    elementRef.value.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // 初始化检查
  });
  
  onUnmounted(() => {
    if (elementRef && elementRef.value) {
      elementRef.value.removeEventListener('scroll', handleScroll);
    }
  });
  
  return { isScrolled };
}
